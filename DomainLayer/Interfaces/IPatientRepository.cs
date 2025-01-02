using DomainLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IPatientRepository
    {
        Task<Patient> AddAsync(Patient patient);
        Task<Patient> GetByIdAsync(int id);
        Task<List<Patient>> GetAllAsync();
        Task<Patient> UpdateAsync(Patient patient);
        Task DeleteAsync(int id);
        Task<List<Patient>> GetByIdsAsync(List<int> patientIds);
    }
}
