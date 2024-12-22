using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IDentistRepository
    {
        Task<Dentist> AddAsync(Dentist dentist);
        Task<Dentist> GetByIdAsync(int id);
        Task<List<Dentist>> GetAllAsync();
        Task<Dentist> UpdateAsync(Dentist dentist);
        Task DeleteAsync(int id);
    }
}
