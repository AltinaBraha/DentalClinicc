using ApplicationLayer.DTOs.ComplaintsDto;
using ApplicationLayer.DTOs.ContactDto;
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
    public class ComplaintsService : IComplaintsService
    {
        private readonly IComplaintsRepository _complaintsRepository;
        private readonly IMapper _mapper;

        public ComplaintsService(IComplaintsRepository complaintsRepository, IMapper mapper)
        {
            _complaintsRepository = complaintsRepository;
            _mapper = mapper;
        }

        public async Task<ComplaintsReadDto> GetComplaintsByIdAsync(int id)
        {
            var complaints = await _complaintsRepository.GetByIdAsync(id);
            return _mapper.Map<ComplaintsReadDto>(complaints);
        }

        public async Task<List<ComplaintsReadDto>> GetAllComplaintsAsync()
        {
            var complaints = await _complaintsRepository.GetAllAsync();
            return _mapper.Map<List<ComplaintsReadDto>>(complaints);
        }

        public async Task<ComplaintsReadDto> CreateComplaintsAsync(ComplaintsCreateDto complaintsDto)
        {
            var complaints = _mapper.Map<Complaints>(complaintsDto);
            var createdComplaints = await _complaintsRepository.AddAsync(complaints);
            return _mapper.Map<ComplaintsReadDto>(createdComplaints);
        }

        public async Task<ComplaintsReadDto> UpdateComplaintsAsync(ComplaintsUpdateDto complaintsDto)
        {
            var complaints = await _complaintsRepository.GetByIdAsync(complaintsDto.ComplaintsId);

            if (complaints == null)
            {
                return null;
            }

            complaints.Ankesa = complaintsDto.Ankesa;
            complaints.PatientId = complaintsDto.PatientId;
            complaints.DentistId = complaintsDto.DentistId;



            var updatedComplaints = await _complaintsRepository.UpdateAsync(complaints);

            return _mapper.Map<ComplaintsReadDto>(updatedComplaints);
        }

        public async Task DeleteComplaintsAsync(int id)
        {
            await _complaintsRepository.DeleteAsync(id);
        }
    }
}
