using ApplicationLayer.DTOs;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DentistController : ControllerBase
    {
        private readonly IDentistService _dentistService;

        public DentistController(IDentistService dentistService)
        {
            _dentistService = dentistService;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetDentistById(int id)
        {
            var dentist = await _dentistService.GetDentistByIdAsync(id);
            if (dentist == null)
            {
                return NotFound();
            }
            return Ok(dentist);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllDentists()
        {
            var dentists = await _dentistService.GetAllDentistsAsync();
            return Ok(dentists);
        }


        [HttpPost]
        public async Task<IActionResult> CreateDentist([FromBody] DentistCreateDto dentistDto)
        {
            var dentist = await _dentistService.CreateDentistAsync(dentistDto);
            return CreatedAtAction(nameof(GetDentistById), new { id = dentist.DentistId }, dentist);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDentist(int id, [FromBody] DentistUpdateDto dentistDto)
        {
            if (id != dentistDto.DentistId)
            {
                return BadRequest();
            }

            var updatedDentist = await _dentistService.UpdateDentistAsync(dentistDto);
            if (updatedDentist == null)
            {
                return NotFound();
            }

            return Ok(updatedDentist);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDentist(int id)
        {
            var dentist = await _dentistService.GetDentistByIdAsync(id);
            if (dentist == null)
            {
                return NotFound();
            }

            await _dentistService.DeleteDentistAsync(id);
            return NoContent();
        }
    }
}
