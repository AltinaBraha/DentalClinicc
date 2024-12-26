using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PatientDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private ClinicDbContext _context;

        public PatientService(IPatientRepository patientRepository, IMapper mapper, IConfiguration configuration, ClinicDbContext context)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
            _configuration = configuration;
            _context = context;
        }

        public async Task<PatientReadDto> GetPatientByIdAsync(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            return _mapper.Map<PatientReadDto>(patient);
        }

        public async Task<List<PatientReadDto>> GetAllPatientsAsync()
        {
            var patients = await _patientRepository.GetAllAsync();
            return _mapper.Map<List<PatientReadDto>>(patients);
        }

        public async Task<ServiceResponse<List<Patient>?>> CreatePatientAsync(PatientCreateDto patientDto, string password)
        {
            var response = new ServiceResponse<List<Patient>>();
            Authentication auth = new Authentication();

            // Check if the admin already exists
            var patients = await _patientRepository.GetAllAsync(); // Await to get the list
            if (patients.Any(a => a.Email.ToLower() == patientDto.Email.ToLower()))
            {
                response.Success = false;
                response.Message = "Patient already exists";
                return response;
            }

            // Map DTO to Admin entity
            var patient = _mapper.Map<Patient>(patientDto);

            // Create password hash and salt
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            patient.PasswordHash = passwordHash;
            patient.PasswordSalt = passwordSalt;

            // Automatically generate a refresh token
            patient.RefreshToken = GenerateRefreshToken();
            patient.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); // Set expiry for refresh token

            // Add admin to the repository
            await _patientRepository.AddAsync(patient);

            // Return all admins
            response.Data = patients.ToList(); // Use LINQ ToList on the list
            response.Success = true;
            response.Message = "Patient created successfully";
            return response;
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }

        public async Task<PatientReadDto> UpdatePatientAsync(PatientUpdateDto patientDto)
        {
            // Get the patient from the repository
            var patient = await _patientRepository.GetByIdAsync(patientDto.PatientId);

            // Check if the patient exists
            if (patient == null)
            {
                return null;  // Patient not found
            }

            // Update the patient properties
            patient.Emri = patientDto.Emri;
            patient.Mbiemri = patientDto.Mbiemri;
            patient.Mosha = patientDto.Mosha;
            patient.NrTelefonit = patientDto.NrTelefonit;
            patient.Email = patientDto.Email;

            // Update ImageId if it's present in the DTO
           /* if (patientDto.ImageId.HasValue)
            {
                patient.ImageId = patientDto.ImageId.Value;
            }*/

            // Call the repository to update the patient
            var updatedPatient = await _patientRepository.UpdateAsync(patient);

            // Return the updated patient as a DTO
            return _mapper.Map<PatientReadDto>(updatedPatient);
        }



        public async Task DeletePatientAsync(int id)
        {
            await _patientRepository.DeleteAsync(id);
        }

        public async Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var patient = await _context.Patients.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (patient == null)
            {
                response.Success = false;
                response.Message = "Patient not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, patient.PasswordHash, patient.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            // Generate Access Token
            string accessToken = CreateToken(patient);

            // Generate Refresh Token
            string refreshToken = CreateRefreshToken();
            patient.RefreshToken = refreshToken;
            patient.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync(); // Save refresh token in database

            // Return both tokens in response
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
            response.Success = true;
            response.Message = "Login successful";

            return response;
        }

        private string CreateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private string CreateToken(Patient patient)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, patient.PatientId.ToString()),
                new Claim(ClaimTypes.Name, patient.Emri),
                new Claim(ClaimTypes.Role, "Patient")
            };

            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null)
            {
                throw new Exception("AppSettings Token is null");
            }

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(15), // Access token valid for 15 minutes
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<ServiceResponse<LoginResponse>> RefreshTokenAsync(string refreshToken)
        {
            var response = new ServiceResponse<LoginResponse>();

            var patient = await _context.Patients.FirstOrDefaultAsync(a => a.RefreshToken == refreshToken);
            if (patient == null || patient.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

            // Generate new access token
            string newAccessToken = CreateToken(patient);

            // Optionally, generate a new refresh token for added security
            string newRefreshToken = CreateRefreshToken();
            patient.RefreshToken = newRefreshToken;
            patient.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // New refresh token valid for 7 more days

            await _context.SaveChangesAsync(); // Update the database

            response.Data = new LoginResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
            response.Success = true;
            response.Message = "Token refreshed successfully";

            return response;
        }
    }
}
