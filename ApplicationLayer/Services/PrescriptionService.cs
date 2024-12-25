using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PrescriptionDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class PrescriptionService : IPrescriptionService
    {
        private readonly IPrescriptionRepository _prescriptionRepository;
        private readonly IMapper _mapper;

        public PrescriptionService(IPrescriptionRepository prescriptionRepository, IMapper mapper)
        {
            _prescriptionRepository = prescriptionRepository;
            _mapper = mapper;
        }

        public async Task<PrescriptionReadDto> GetPrescriptionByIdAsync(int id)
        {
            var prescription = await _prescriptionRepository.GetByIdAsync(id);
            return _mapper.Map<PrescriptionReadDto>(prescription);
        }

        public async Task<List<PrescriptionReadDto>> GetAllPrescriptionsAsync()
        {
            var prescription = await _prescriptionRepository.GetAllAsync();
            return _mapper.Map<List<PrescriptionReadDto>>(prescription);
        }

        public async Task<PrescriptionReadDto> CreatePrescriptionAsync(PrescriptionCreateDto prescriptionDto)
        {
            var prescription = _mapper.Map<Prescription>(prescriptionDto);
            var createdPrescription = await _prescriptionRepository.AddAsync(prescription);
            return _mapper.Map<PrescriptionReadDto>(createdPrescription);
        }

        public async Task<PrescriptionReadDto> UpdatePrescriptionAsync(PrescriptionUpdateDto prescriptionDto)
        {
            var prescription = await _prescriptionRepository.GetByIdAsync(prescriptionDto.PrescriptionId);

            if (prescription == null)
            {
                return null;
            }

            prescription.Diagnoza = prescriptionDto.Diagnoza;
            prescription.Medicina = prescriptionDto.Medicina;
            prescription.PatientId = prescriptionDto.PatientId;
            prescription.DentistId = prescriptionDto.DentistId;



            var updatedPrescription = await _prescriptionRepository.UpdateAsync(prescription);

            return _mapper.Map<PrescriptionReadDto>(updatedPrescription);
        }

        public async Task DeletePrescriptionAsync(int id)
        {
            await _prescriptionRepository.DeleteAsync(id);
        }
    }
}
