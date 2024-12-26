using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.AdminDto;
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
            var response = await _dentistService.CreateDentistAsync(dentistDto, dentistDto.Password);

            if (!(bool)response.Success)
            {
                return BadRequest(response.Message);
            }

            var newDentist = response.Data?.FirstOrDefault(a => a.Email == dentistDto.Email);
            if (newDentist == null)
            {
                return StatusCode(500, "Dentist creation succeeded but dentist could not be found.");
            }

            return CreatedAtAction(nameof(GetDentistById), new { id = newDentist.DentistId }, newDentist);
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

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> Login(Login request)
        {
            var response = await _dentistService.LoginAsync(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _dentistService.RefreshTokenAsync(refreshToken);
            if (!(bool)response.Success)
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }
    }
}
