using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IComplaintsRepository
    {
        Task<Complaints> AddAsync(Complaints complaints);
        Task<Complaints> GetByIdAsync(int id);
        Task<List<Complaints>> GetAllAsync();
        Task<Complaints> UpdateAsync(Complaints complaints);
        Task DeleteAsync(int id);
    }
}
