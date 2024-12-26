using ApplicationLayer.DTOs.AdminDto;
using DomainLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IAdminService
    {
        Task<List<AdminReadDto>> GetAllAsync();
        Task<AdminReadDto?> GetByIdAsync(int id);
        Task<List<AdminReadDto>> GetByDepartmentIdAsync(int departmentId);
        Task<ServiceResponse<List<Admin>?>> CreateAdminAsync(AdminCreateDto admin, string password); // Explicitly named for creation
        Task<AdminReadDto> UpdateAdminAsync(AdminUpdateDto admin);
        Task DeleteAsync(int id);
        Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password);
        Task<ServiceResponse<LoginResponse>> RefreshTokenAsync(string refreshToken);
    }
}
