using ApplicationLayer.DTOs.ContactDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _contactService.GetAllContactsAsync();
            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactCreateDto contactDto)
        {
            var contact = await _contactService.CreateContactAsync(contactDto);
            return CreatedAtAction(nameof(GetContactById), new { id = contact.ContactId }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] ContactUpdateDto contactDto)
        {
            if (id != contactDto.ContactId)
            {
                return BadRequest();
            }

            var updatedContact = await _contactService.UpdateContactAsync(contactDto);
            if (updatedContact == null)
            {
                return NotFound();
            }

            return Ok(updatedContact);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            await _contactService.DeleteContactAsync(id);
            return NoContent();
        }
    }
}
