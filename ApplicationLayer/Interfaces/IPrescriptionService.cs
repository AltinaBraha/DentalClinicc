using ApplicationLayer.DTOs.PrescriptionDto;
using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IPrescriptionService
    {
        Task<PrescriptionReadDto> GetPrescriptionByIdAsync(int id);
        Task<List<PrescriptionReadDto>> GetAllPrescriptionsAsync();
        Task<PrescriptionReadDto> CreatePrescriptionAsync(PrescriptionCreateDto prescriptionDto);
        Task<PrescriptionReadDto> UpdatePrescriptionAsync(PrescriptionUpdateDto prescriptionDto);
        Task DeletePrescriptionAsync(int id);
    }
}
