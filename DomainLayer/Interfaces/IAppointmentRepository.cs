using DomainLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<List<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync(int id);
        Task<List<Appointment>> GetByDentistIdAsync(int dentistId);
        Task<List<Appointment>> GetByPatientIdAsync(int patientId);
        Task<Appointment> AddAsync(Appointment appointment);
        Task<Appointment> UpdateAsync(Appointment appointment);
        Task DeleteAsync(int id);
    }
}
