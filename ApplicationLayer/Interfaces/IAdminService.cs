using ApplicationLayer.DTOs.AdminDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IAdminService
    {
        Task<List<AdminReadDto>> GetAllAsync();
        Task<AdminReadDto?> GetByIdAsync(int id);
        Task<List<AdminReadDto>> GetByDepartmentIdAsync(int departmentId);
        Task<AdminReadDto> CreateAdminAsync(AdminCreateDto admin); // Explicitly named for creation
        Task<AdminReadDto> UpdateAdminAsync(AdminUpdateDto admin);
        Task DeleteAsync(int id);
    }
}
