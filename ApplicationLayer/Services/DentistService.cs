using ApplicationLayer.DTOs;
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
    public class DentistService : IDentistService
    {
        private readonly IDentistRepository _dentistRepository;
        private readonly IMapper _mapper;

        public DentistService(IDentistRepository dentistRepository, IMapper mapper)
        {
            _dentistRepository = dentistRepository;
            _mapper = mapper;
        }

        public async Task<DentistReadDto> GetDentistByIdAsync(int id)
        {
            var dentist = await _dentistRepository.GetByIdAsync(id);
            return _mapper.Map<DentistReadDto>(dentist);
        }

        public async Task<List<DentistReadDto>> GetAllDentistsAsync()
        {
            var dentists = await _dentistRepository.GetAllAsync();
            return _mapper.Map<List<DentistReadDto>>(dentists);
        }

        public async Task<DentistReadDto> CreateDentistAsync(DentistCreateDto dentistDto)
        {
            var dentist = _mapper.Map<Dentist>(dentistDto);
            var createdDentist = await _dentistRepository.AddAsync(dentist);
            return _mapper.Map<DentistReadDto>(createdDentist);
        }

        public async Task<DentistReadDto> UpdateDentistAsync(DentistUpdateDto dentistDto)
        {
            // Get the patient from the repository
            var dentist = await _dentistRepository.GetByIdAsync(dentistDto.DentistId);

            // Check if the patient exists
            if (dentist == null)
            {
                return null;  // Patient not found
            }

            // Update the patient properties
            dentist.Emri = dentistDto.Emri;
            dentist.Mbiemri = dentistDto.Mbiemri;
            dentist.Mosha = dentistDto.Mosha;
            dentist.NrTelefonit = dentistDto.NrTelefonit;
            dentist.Email = dentistDto.Email;

            // Update ImageId if it's present in the DTO
            /* if (dentistDto.ImageId.HasValue)
             {
                 dentist.ImageId = dentistDto.ImageId.Value;
             }*/

            // Call the repository to update the patient
            var updatedDentist = await _dentistRepository.UpdateAsync(dentist);

            // Return the updated patient as a DTO
            return _mapper.Map<DentistReadDto>(updatedDentist);
        }

        public async Task DeleteDentistAsync(int id)
        {
            await _dentistRepository.DeleteAsync(id);
        }
    }
}
