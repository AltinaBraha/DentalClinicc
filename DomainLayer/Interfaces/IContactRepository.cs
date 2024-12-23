using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IContactRepository
    {
        Task<Contact> AddAsync(Contact contact);
        Task<Contact> GetByIdAsync(int id);
        Task<List<Contact>> GetAllAsync();
        Task<Contact> UpdateAsync(Contact contact);
        Task DeleteAsync(int id);
    }
}
