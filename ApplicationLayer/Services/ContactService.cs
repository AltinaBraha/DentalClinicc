using ApplicationLayer.DTOs.ContactDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
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
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        private readonly IMapper _mapper;

        public ContactService(IContactRepository contactRepository, IMapper mapper)
        {
            _contactRepository = contactRepository;
            _mapper = mapper;
        }

        public async Task<ContactReadDto> GetContactByIdAsync(int id)
        {
            var contact = await _contactRepository.GetByIdAsync(id);
            return _mapper.Map<ContactReadDto>(contact);
        }

        public async Task<List<ContactReadDto>> GetAllContactsAsync()
        {
            var contacts = await _contactRepository.GetAllAsync();
            return _mapper.Map<List<ContactReadDto>>(contacts);
        }

        public async Task<ContactReadDto> CreateContactAsync(ContactCreateDto contactDto)
        {
            var contact = _mapper.Map<Contact>(contactDto);
            var createdContact = await _contactRepository.AddAsync(contact);
            return _mapper.Map<ContactReadDto>(createdContact);
        }

        public async Task<ContactReadDto> UpdateContactAsync(ContactUpdateDto contactDto)
        {
            var contact = await _contactRepository.GetByIdAsync(contactDto.ContactId);

            if (contact == null)
            {
                return null;
            }

            contact.Mesazhi = contactDto.Mesazhi;
            contact.MessageDate = contactDto.MessageDate;
            contact.PatientId = contactDto.PatientId;



            var updatedContact = await _contactRepository.UpdateAsync(contact);

            return _mapper.Map<ContactReadDto>(updatedContact);
        }

        public async Task DeleteContactAsync(int id)
        {
            await _contactRepository.DeleteAsync(id);
        }
    }
}
