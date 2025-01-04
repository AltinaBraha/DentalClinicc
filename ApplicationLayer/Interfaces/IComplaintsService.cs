using ApplicationLayer.DTOs.ComplaintsDto;
using ApplicationLayer.DTOs.ContactDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IComplaintsService
    {
        Task<ComplaintsReadDto> GetComplaintsByIdAsync(int id);
        Task<List<ComplaintsReadDto>> GetByDentistIdAsync(int dentistId);
        Task<List<ComplaintsReadDto>> GetByPatientIdAsync(int patientId);
        Task<List<ComplaintsReadDto>> GetAllComplaintsAsync();
        Task<ComplaintsReadDto> CreateComplaintsAsync(ComplaintsCreateDto complaintsDto);
        Task<ComplaintsReadDto> UpdateComplaintsAsync(ComplaintsUpdateDto complaintsDto);
        Task DeleteComplaintsAsync(int id);
    }
}
