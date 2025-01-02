using ApplicationLayer.DTOs;
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
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _patientService.GetPatientByIdAsync(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _patientService.GetAllPatientsAsync();
            return Ok(patients);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody] PatientCreateDto patientDto)
        {
            var response = await _patientService.CreatePatientAsync(patientDto, patientDto.Password);

            if (!(bool)response.Success)
            {
                return BadRequest(response.Message);
            }

            var newPatient = response.Data?.FirstOrDefault(a => a.Email == patientDto.Email);
            if (newPatient == null)
            {
                return StatusCode(500, "Patient creation succeeded but patient could not be found.");
            }

            return CreatedAtAction(nameof(GetPatientById), new { id = newPatient.PatientId }, newPatient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] PatientUpdateDto patientDto)
        {
            if (id != patientDto.PatientId)
            {
                return BadRequest();
            }

            var updatedPatient = await _patientService.UpdatePatientAsync(patientDto);
            if (updatedPatient == null)
            {
                return NotFound();
            }

            return Ok(updatedPatient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _patientService.GetPatientByIdAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            await _patientService.DeletePatientAsync(id);
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchPatients([FromQuery] string? name = null)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Search term cannot be empty.");
            }

            var patients = await _patientService.SearchByNameAsync(name);

            if (patients == null || !patients.Any())
            {
                return NotFound("No patients found with the given name.");
            }

            return Ok(patients);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> Login(Login request)
        {
            var response = await _patientService.LoginAsync(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _patientService.RefreshTokenAsync(refreshToken);
            if (!(bool)response.Success)
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }

        [HttpGet("byDentist/{dentistId}")]
        public async Task<IActionResult> GetPatientsByDentistId(int dentistId)
        {
            var patients = await _patientService.GetPatientsByDentistIdAsync(dentistId);

            if (patients == null || !patients.Any())
            {
                return NotFound("No patients found for the given dentist.");
            }

            return Ok(patients);
        }

    }
}
