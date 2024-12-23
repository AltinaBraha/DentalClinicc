using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PatientDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;

        public PatientService(IPatientRepository patientRepository, IMapper mapper)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<PatientReadDto> GetPatientByIdAsync(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            return _mapper.Map<PatientReadDto>(patient);
        }

        public async Task<List<PatientReadDto>> GetAllPatientsAsync()
        {
            var patients = await _patientRepository.GetAllAsync();
            return _mapper.Map<List<PatientReadDto>>(patients);
        }

        public async Task<PatientReadDto> CreatePatientAsync(PatientCreateDto patientDto)
        {
            var patient = _mapper.Map<Patient>(patientDto);
            var createdPatient = await _patientRepository.AddAsync(patient);
            return _mapper.Map<PatientReadDto>(createdPatient);
        }

        public async Task<PatientReadDto> UpdatePatientAsync(PatientUpdateDto patientDto)
        {
            // Get the patient from the repository
            var patient = await _patientRepository.GetByIdAsync(patientDto.PatientId);

            // Check if the patient exists
            if (patient == null)
            {
                return null;  // Patient not found
            }

            // Update the patient properties
            patient.Emri = patientDto.Emri;
            patient.Mbiemri = patientDto.Mbiemri;
            patient.Mosha = patientDto.Mosha;
            patient.NrTelefonit = patientDto.NrTelefonit;
            patient.Email = patientDto.Email;

            // Update ImageId if it's present in the DTO
           /* if (patientDto.ImageId.HasValue)
            {
                patient.ImageId = patientDto.ImageId.Value;
            }*/

            // Call the repository to update the patient
            var updatedPatient = await _patientRepository.UpdateAsync(patient);

            // Return the updated patient as a DTO
            return _mapper.Map<PatientReadDto>(updatedPatient);
        }



        public async Task DeletePatientAsync(int id)
        {
            await _patientRepository.DeleteAsync(id);
        }
    }
}
