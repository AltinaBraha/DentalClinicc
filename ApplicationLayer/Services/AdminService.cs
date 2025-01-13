using ApplicationLayer.DTOs.AdminDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using InfrastructureLayer;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private ClinicDbContext _context;

        public AdminService(IAdminRepository adminRepository, IMapper mapper, IConfiguration configuration, ClinicDbContext context)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
            _configuration = configuration;
            _context = context;
        }

        public async Task<List<AdminReadDto>> GetAllAsync()
        {
            var admins = await _adminRepository.GetAllAsync();
            return _mapper.Map<List<AdminReadDto>>(admins);
        }

        public async Task<AdminReadDto?> GetByIdAsync(int id)
        {
            var admin = await _adminRepository.GetByIdAsync(id);
            return admin != null ? _mapper.Map<AdminReadDto>(admin) : null;
        }

        public async Task<List<AdminReadDto>> GetByDepartmentIdAsync(int departmentId)
        {
            var admins = await _adminRepository.GetByDepartmentIdAsync(departmentId);
            return _mapper.Map<List<AdminReadDto>>(admins);
        }

        public async Task<ServiceResponse<List<Admin>?>> CreateAdminAsync(AdminCreateDto adminDto, string password)
        {
            var response = new ServiceResponse<List<Admin>>();
            Authentication auth = new Authentication();

            
            var admins = await _adminRepository.GetAllAsync(); 
            if (admins.Any(a => a.Email.ToLower() == adminDto.Email.ToLower()))
            {
                response.Success = false;
                response.Message = "Admin already exists";
                return response;
            }

            // Map DTO to Admin entity
            var admin = _mapper.Map<Admin>(adminDto);

        
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;

            
            admin.RefreshToken = GenerateRefreshToken();
            admin.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); 

            
            await _adminRepository.AddAsync(admin);

            
            response.Data = _context.Admins.ToList(); 
            response.Success = true;
            response.Message = "Admin created successfully";
            return response;
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();  
        }

        public async Task<AdminReadDto> UpdateAdminAsync(AdminUpdateDto adminDto)
        {
            var admin = await _adminRepository.GetByIdAsync(adminDto.AdminId);

            if (admin == null)
            {
                return null;
            }

            admin.Emri = adminDto.Emri;
            admin.Mbiemri = adminDto.Mbiemri;
            admin.Email = adminDto.Email;
           // admin.ImageId = adminDto.ImageId;
            admin.DepartmentId = adminDto.DepartmentId;

            if (adminDto.ImageId.HasValue)
            {
                admin.ImageId = adminDto.ImageId.Value;
            }

            var updatedAdmin = await _adminRepository.UpdateAsync(admin);

            return _mapper.Map<AdminReadDto>(updatedAdmin);
        }

        public async Task DeleteAsync(int id)
        {
            await _adminRepository.DeleteAsync(id);
        }

        public async Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var admin = await _context.Admins.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (admin == null)
            {
                response.Success = false;
                response.Message = "Admin not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            
            string accessToken = CreateToken(admin);

          
            string refreshToken = CreateRefreshToken();
            admin.RefreshToken = refreshToken;
            admin.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync(); 

            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Admin = new Admin 
                { 
                    AdminId = admin.AdminId,
                    Emri = admin.Emri,
                    Mbiemri = admin.Mbiemri,
                    Email = admin.Email,
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

        private string CreateToken(Admin admin)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, admin.AdminId.ToString()),
                new Claim(ClaimTypes.Name, admin.Emri),
                new Claim(ClaimTypes.Role, "Admin")
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

            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.RefreshToken == refreshToken);
            if (admin == null || admin.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

           
            string newAccessToken = CreateToken(admin);

            
            string newRefreshToken = CreateRefreshToken();
            admin.RefreshToken = newRefreshToken;
            admin.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); 

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

    }
}
