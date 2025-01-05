using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.DepartmentDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IDepartmentService
    {
        Task<DepartmentReadDto> GetDepartmentByIdAsync(int id);
        Task<List<DepartmentReadDto>> GetAllDepartmentsAsync();
        Task<DepartmentReadDto> CreateDepartmentAsync(DepartmentCreateDto departmentDto);
        Task<DepartmentReadDto> UpdateDepartmentAsync(DepartmentUpdateDto departmentDto);
        Task DeleteDepartmentAsync(int id);
        Task<int> CountDepartmentsByClinicNameAsync(string clinicName);
    }
}
