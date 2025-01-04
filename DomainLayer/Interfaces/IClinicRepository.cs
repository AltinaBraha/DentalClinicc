using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IClinicRepository
    {
        Task<Clinic> AddAsync(Clinic clinic);
        Task<Clinic> GetByIdAsync(int id);
        Task<List<Clinic>> GetAllAsync();
        Task<Clinic> UpdateAsync(Clinic clinic);
        Task DeleteAsync(int id);

        // metoda për të marrë klinikat sipas lokacionit
        Task<List<Clinic>> GetByLocationNameAsync(string location);

        // metoda për të kontrolluar ekzistencën e një klinike
        Task<bool> ExistsClinicAsync(string clinicName, string location);
    }
}
