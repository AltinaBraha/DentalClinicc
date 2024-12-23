using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<Department> AddAsync(Department department);
        Task<Department> GetByIdAsync(int id);
        Task<List<Department>> GetAllAsync();
        Task<Department> UpdateAsync(Department department);
        Task DeleteAsync(int id);
    }
}
