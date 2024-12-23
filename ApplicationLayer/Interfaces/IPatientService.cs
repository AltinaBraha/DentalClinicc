using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PatientDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IPatientService
    {
        Task<PatientReadDto> GetPatientByIdAsync(int id);
        Task<List<PatientReadDto>> GetAllPatientsAsync();
        Task<PatientReadDto> CreatePatientAsync(PatientCreateDto patientDto);
        Task<PatientReadDto> UpdatePatientAsync(PatientUpdateDto patientDto);
        Task DeletePatientAsync(int id);
    }
}
