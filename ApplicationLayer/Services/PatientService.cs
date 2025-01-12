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
        private readonly IAppointmentRepository _appointmentRepository;
        private ClinicDbContext _context;

        public PatientService(IPatientRepository patientRepository, IMapper mapper, IConfiguration configuration, ClinicDbContext context, IAppointmentRepository appointmentRepository)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
            _configuration = configuration;
            _context = context;
            _appointmentRepository = appointmentRepository;
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

           
            var patients = await _patientRepository.GetAllAsync(); 
            if (patients.Any(a => a.Email.ToLower() == patientDto.Email.ToLower()))
            {
                response.Success = false;
                response.Message = "Patient already exists";
                return response;
            }

            
            var patient = _mapper.Map<Patient>(patientDto);

            
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            patient.PasswordHash = passwordHash;
            patient.PasswordSalt = passwordSalt;

            
            patient.RefreshToken = GenerateRefreshToken();
            patient.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); 

            
            await _patientRepository.AddAsync(patient);

            response.Data = _context.Patients.ToList(); 
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
            
            var patient = await _patientRepository.GetByIdAsync(patientDto.PatientId);

            
            if (patient == null)
            {
                return null;  
            }

            
            patient.Emri = patientDto.Emri;
            patient.Mbiemri = patientDto.Mbiemri;
            patient.Mosha = patientDto.Mosha;
            patient.NrTelefonit = patientDto.NrTelefonit;
            patient.Email = patientDto.Email;

           
           if (patientDto.ImageId.HasValue)
            {
                patient.ImageId = patientDto.ImageId.Value;
            }


            
            var updatedPatient = await _patientRepository.UpdateAsync(patient);

            
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

            
            string accessToken = CreateToken(patient);

            
            string refreshToken = CreateRefreshToken();
            patient.RefreshToken = refreshToken;
            patient.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync(); 

            
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Patient = new Patient
                {
                    PatientId = patient.PatientId,
                    Emri = patient.Emri,
                    Mbiemri = patient.Mbiemri,
                    Mosha = patient.Mosha,
                    NrTelefonit = patient.NrTelefonit,
                    Email = patient.Email,
                }
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
                Expires = DateTime.Now.AddMinutes(15), 
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

            
            string newAccessToken = CreateToken(patient);

            
            string newRefreshToken = CreateRefreshToken();
            patient.RefreshToken = newRefreshToken;
            patient.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); 

            await _context.SaveChangesAsync();

            response.Data = new LoginResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
            response.Success = true;
            response.Message = "Token refreshed successfully";

            return response;
        }

        public async Task<List<PatientReadDto>> GetPatientsByDentistIdAsync(int dentistId)
        {
           
            var appointments = await _appointmentRepository.GetByDentistIdAsync(dentistId);

            
            var patientIds = appointments
                .Select(a => a.PatientId)
                .Where(id => id.HasValue) 
                .Select(id => id.Value) 
                .Distinct()
                .ToList();

            if (!patientIds.Any())
            {
                return new List<PatientReadDto>();
            }

            
            var patients = await _patientRepository.GetByIdsAsync(patientIds);

            
            return _mapper.Map<List<PatientReadDto>>(patients);
        }


        public async Task<List<PatientReadDto>> SearchByNameAsync(string name)
        {
            var patients = await _context.Patients
             .Where(d => d.Emri.ToLower().Contains(name.ToLower()) ||
                d.Mbiemri.ToLower().Contains(name.ToLower()))
            .ToListAsync();



           
            return _mapper.Map<List<PatientReadDto>>(patients);
        }

    }
}
