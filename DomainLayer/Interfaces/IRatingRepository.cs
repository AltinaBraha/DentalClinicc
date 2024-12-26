using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IRatingRepository
    {
        Task<Rating> AddAsync(Rating rating);
        Task<Rating> GetByIdAsync(int id);
        Task<List<Rating>> GetAllAsync();
        Task<Rating> UpdateAsync(Rating rating);
        Task DeleteAsync(int id);
    }
}
