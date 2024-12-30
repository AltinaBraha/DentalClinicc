using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IMedicalRecordService
    {
        Task<MedicalRecordReadDto> GetMedicalRecordByIdAsync(int id);
        Task<List<MedicalRecordReadDto>> GetByDentistIdAsync(int dentistId);
        Task<List<MedicalRecordReadDto>> GetByPatientIdAsync(int patientId);
        Task<List<MedicalRecordReadDto>> GetAllMedicalRecordsAsync();
        Task<MedicalRecordReadDto> CreateMedicalRecordAsync(MedicalRecordCreateDto medicalRecordDto);
        Task<MedicalRecordReadDto> UpdateMedicalRecordAsync(MedicalRecordUpdateDto medicalRecordDto);
        Task DeleteMedicalRecordAsync(int id);
    }
}
