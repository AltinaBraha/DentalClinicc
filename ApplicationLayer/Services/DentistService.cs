using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.AdminDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using InfrastructureLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class DentistService : IDentistService
    {
        private readonly IDentistRepository _dentistRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private ClinicDbContext _context;

        public DentistService(IDentistRepository dentistRepository, IMapper mapper, IConfiguration configuration, ClinicDbContext context)
        {
            _dentistRepository = dentistRepository;
            _mapper = mapper;
            _configuration = configuration;
            _context = context;
        }

        public async Task<DentistReadDto> GetDentistByIdAsync(int id)
        {
            var dentist = await _dentistRepository.GetByIdAsync(id);
            return _mapper.Map<DentistReadDto>(dentist);
        }

        public async Task<List<DentistReadDto>> GetAllDentistsAsync()
        {
            var dentists = await _dentistRepository.GetAllAsync();
            return _mapper.Map<List<DentistReadDto>>(dentists);
        }

        public async Task<ServiceResponse<List<Dentist>?>> CreateDentistAsync(DentistCreateDto dentistDto, string password)
        {
            var response = new ServiceResponse<List<Dentist>>();
            Authentication auth = new Authentication();

            // Check if the admin already exists
            var dentists = await _dentistRepository.GetAllAsync(); // Await to get the list
            if (dentists.Any(a => a.Email.ToLower() == dentistDto.Email.ToLower()))
            {
                response.Success = false;
                response.Message = "Dentist already exists";
                return response;
            }

            // Map DTO to Admin entity
            var dentist = _mapper.Map<Dentist>(dentistDto);

            // Create password hash and salt
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            dentist.PasswordHash = passwordHash;
            dentist.PasswordSalt = passwordSalt;

            // Automatically generate a refresh token
            dentist.RefreshToken = GenerateRefreshToken();
            dentist.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); // Set expiry for refresh token

            // Add admin to the repository
            await _dentistRepository.AddAsync(dentist);

            // Return all admins
            response.Data = _context.Dentists.ToList(); // Use LINQ ToList on the list
            response.Success = true;
            response.Message = "Dentist created successfully";
            return response;
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }

        public async Task<DentistReadDto> UpdateDentistAsync(DentistUpdateDto dentistDto)
        {
            var dentist = await _dentistRepository.GetByIdAsync(dentistDto.DentistId);

            if (dentist == null)
            {
                return null;  
            }

            dentist.Emri = dentistDto.Emri;
            dentist.Mbiemri = dentistDto.Mbiemri;
            dentist.Mosha = dentistDto.Mosha;
            dentist.NrTelefonit = dentistDto.NrTelefonit;
            dentist.Email = dentistDto.Email;
            dentist.Specializimi = dentistDto.Specializimi;
            dentist.OraFillimit = dentistDto.OraFillimit;
            dentist.OraMbarimit = dentistDto.OraMbarimit;

            // Update ImageId if it's present in the DTO
             if (dentistDto.ImageId.HasValue)
             {
                 dentist.ImageId = dentistDto.ImageId.Value;
             }
            //dentist.DepartmentId = dentistDto.DepartmentId;
            var updatedDentist = await _dentistRepository.UpdateAsync(dentist);

            return _mapper.Map<DentistReadDto>(updatedDentist);
        }

        public async Task DeleteDentistAsync(int id)
        {
            await _dentistRepository.DeleteAsync(id);
        }

        public async Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var dentist = await _context.Dentists.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (dentist == null)
            {
                response.Success = false;
                response.Message = "Dentist not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, dentist.PasswordHash, dentist.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            // Generate Access Token
            string accessToken = CreateToken(dentist);

            // Generate Refresh Token
            string refreshToken = CreateRefreshToken();
            dentist.RefreshToken = refreshToken;
            dentist.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync(); // Save refresh token in database

            // Return both tokens in response
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Dentist = new Dentist
                {
                    DentistId = dentist.DentistId,
                    Emri = dentist.Emri,
                    Mbiemri = dentist.Mbiemri,
                    Mosha = dentist.Mosha,
                    NrTelefonit = dentist.NrTelefonit,
                    Email = dentist.Email,
                    Specializimi = dentist.Specializimi,
                    OraFillimit = dentist.OraFillimit,
                    OraMbarimit = dentist.OraMbarimit,
                    DepartmentId = dentist.DepartmentId,
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

        private string CreateToken(Dentist dentist)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, dentist.DentistId.ToString()),
                new Claim(ClaimTypes.Name, dentist.Emri),
                new Claim(ClaimTypes.Role, "Dentist")
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

            var dentist = await _context.Dentists.FirstOrDefaultAsync(a => a.RefreshToken == refreshToken);
            if (dentist == null || dentist.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

            // Generate new access token
            string newAccessToken = CreateToken(dentist);

            // Optionally, generate a new refresh token for added security
            string newRefreshToken = CreateRefreshToken();
            dentist.RefreshToken = newRefreshToken;
            dentist.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // New refresh token valid for 7 more days

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
