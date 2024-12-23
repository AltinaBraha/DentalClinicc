using ApplicationLayer.DTOs.ContactDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IContactService
    {
        Task<ContactReadDto> GetContactByIdAsync(int id);
        Task<List<ContactReadDto>> GetAllContactsAsync();
        Task<ContactReadDto> CreateContactAsync(ContactCreateDto contactDto);
        Task<ContactReadDto> UpdateContactAsync(ContactUpdateDto contactDto);
        Task DeleteContactAsync(int id);
    }
}
