using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IAppointmentService
    {
        Task<List<AppointmentReadDto>> GetAllAsync();
        Task<AppointmentReadDto> GetAppointmentByIdAsync(int id);
        Task<List<AppointmentReadDto>> GetByDentistIdAsync(int dentistId);
        Task<List<AppointmentReadDto>> GetByPatientIdAsync(int patientId);
        Task<AppointmentReadDto> CreateAppointmentAsync(AppointmentCreateDto appointmentDto); 
        Task<AppointmentReadDto> UpdateAppointmentAsync(AppointmentUpdateDto appointmentDto);
        Task DeleteAsync(int id);
    }
}
