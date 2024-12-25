using DomainLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IAdminRepository
    {
        Task<List<Admin>> GetAllAsync();
        Task<Admin?> GetByIdAsync(int id);
        Task<List<Admin>> GetByDepartmentIdAsync(int departmentId);
        Task<Admin> AddAsync(Admin admin);
        Task<Admin> UpdateAsync(Admin admin);
        Task DeleteAsync(int id);
    }
}
