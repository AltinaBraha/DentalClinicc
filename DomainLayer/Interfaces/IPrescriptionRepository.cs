using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IPrescriptionRepository
    {
        Task<Prescription> AddAsync(Prescription prescription);
        Task<Prescription> GetByIdAsync(int id);
        Task<List<Prescription>> GetByDentistIdAsync(int dentistId);
        Task<List<Prescription>> GetByPatientIdAsync(int patientId);
        Task<List<Prescription>> GetAllAsync();
        Task<Prescription> UpdateAsync(Prescription prescription);
        Task DeleteAsync(int id);
    }
}
