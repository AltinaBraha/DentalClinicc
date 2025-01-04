using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.ClinicDto;
using ApplicationLayer.DTOs.PatientDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicController : ControllerBase
    {
        private readonly IClinicService _clinicService;

        public ClinicController(IClinicService clinicService)
        {
            _clinicService = clinicService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClinicById(int id)
        {
            var clinic = await _clinicService.GetClinicByIdAsync(id);
            if (clinic == null)
            {
                return NotFound();
            }
            return Ok(clinic);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClinics()
        {
            var clinics = await _clinicService.GetAllClinicsAsync();
            return Ok(clinics);
        }

        [HttpPost]
        public async Task<IActionResult> CreateClinic([FromBody] ClinicCreateDto clinicDto)
        {
            var clinic = await _clinicService.CreateClinicAsync(clinicDto);
            return CreatedAtAction(nameof(GetClinicById), new { id = clinic.ClinicId }, clinic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClinic(int id, [FromBody] ClinicUpdateDto clinicDto)
        {
            if (id != clinicDto.ClinicId)
            {
                return BadRequest();
            }

            var updatedClinic = await _clinicService.UpdateClinicAsync(clinicDto);
            if (updatedClinic == null)
            {
                return NotFound();
            }

            return Ok(updatedClinic);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClinic(int id)
        {
            var clinic = await _clinicService.GetClinicByIdAsync(id);
            if (clinic == null)
            {
                return NotFound();
            }

            await _clinicService.DeleteClinicAsync(id);
            return NoContent();
        }

        [HttpGet("by-location")]
        public async Task<IActionResult> GetClinicsByLocation([FromQuery] string location)
        {
            var clinics = await _clinicService.GetClinicsByLocationAsync(location);
            if (clinics == null || clinics.Count == 0)
            {
                return NotFound();
            }
            return Ok(clinics);
        }

        [HttpGet("exists")]
        public async Task<IActionResult> ClinicExists([FromQuery] string clinicName, [FromQuery] string location)
        {
            var exists = await _clinicService.ClinicExistsAsync(clinicName, location);
            if (!exists)
            {
                return NotFound();
            }
            return Ok(new { message = "Clinic exists." });
        }
    }
}