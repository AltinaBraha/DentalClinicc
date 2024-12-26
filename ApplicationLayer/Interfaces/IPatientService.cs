using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PatientDto;
using DomainLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IPatientService
    {
        Task<PatientReadDto> GetPatientByIdAsync(int id);
        Task<List<PatientReadDto>> GetAllPatientsAsync();
        Task<ServiceResponse<List<Patient>?>> CreatePatientAsync(PatientCreateDto patient, string password);
        Task<PatientReadDto> UpdatePatientAsync(PatientUpdateDto patientDto);
        Task DeletePatientAsync(int id);
        Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password);
        Task<ServiceResponse<LoginResponse>> RefreshTokenAsync(string refreshToken);
    }
}
