using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.ClinicDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class ClinicService : IClinicService
    {
        private readonly IClinicRepository _clinicRepository;
        private readonly IMapper _mapper;

        public ClinicService(IClinicRepository clinicRepository, IMapper mapper)
        {
            _clinicRepository = clinicRepository;
            _mapper = mapper;
        }

        public async Task<ClinicReadDto> GetClinicByIdAsync(int id)
        {
            var clinic = await _clinicRepository.GetByIdAsync(id);
            return _mapper.Map<ClinicReadDto>(clinic);
        }

        public async Task<List<ClinicReadDto>> GetAllClinicsAsync()
        {
            var clinics = await _clinicRepository.GetAllAsync();
            return _mapper.Map<List<ClinicReadDto>>(clinics);
        }

        public async Task<ClinicReadDto> CreateClinicAsync(ClinicCreateDto clinicDto)
        {
            var clinic = _mapper.Map<Clinic>(clinicDto);
            var createdClinic = await _clinicRepository.AddAsync(clinic);
            return _mapper.Map<ClinicReadDto>(createdClinic);
        }

        public async Task<ClinicReadDto> UpdateClinicAsync(ClinicUpdateDto clinicDto)
        {
            // Get the patient from the repository
            var clinic = await _clinicRepository.GetByIdAsync(clinicDto.ClinicId);

            
            if (clinic == null)
            {
                return null;  
            }

            // Update the patient properties
            clinic.ClinicName = clinicDto.ClinicName;
            clinic.Location = clinicDto.Location;
    

            // Call the repository to update the patient
            var updatedClinic = await _clinicRepository.UpdateAsync(clinic);

            // Return the updated patient as a DTO
            return _mapper.Map<ClinicReadDto>(updatedClinic);
        }



        public async Task DeleteClinicAsync(int id)
        {
            await _clinicRepository.DeleteAsync(id);
        }

        // Shto metodën për të marrë klinikat sipas lokacionit
        public async Task<List<ClinicReadDto>> GetClinicsByLocationAsync(string location)
        {
            var clinics = await _clinicRepository.GetByLocationNameAsync(location);
            return _mapper.Map<List<ClinicReadDto>>(clinics);
        }


        // Shto metodën për të kontrolluar ekzistencën e një klinike
        public async Task<bool> ClinicExistsAsync(string clinicName, string location)
        {
            return await _clinicRepository.ExistsClinicAsync(clinicName, location);
        }
    }
}