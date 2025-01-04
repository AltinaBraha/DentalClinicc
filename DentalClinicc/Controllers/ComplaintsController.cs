using ApplicationLayer.DTOs.ComplaintsDto;
using ApplicationLayer.DTOs.ContactDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly IComplaintsService _complaintsService;

        public ComplaintsController(IComplaintsService complaintsService)
        {
            _complaintsService = complaintsService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintsById(int id)
        {
            var complaints = await _complaintsService.GetComplaintsByIdAsync(id);
            if (complaints == null)
            {
                return NotFound();
            }
            return Ok(complaints);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await _complaintsService.GetAllComplaintsAsync();
            return Ok(complaints);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaints([FromBody] ComplaintsCreateDto complaintsDto)
        {
            var complaints = await _complaintsService.CreateComplaintsAsync(complaintsDto);
            return CreatedAtAction(nameof(GetComplaintsById), new { id = complaints.ComplaintsId }, complaints);
        }
        [HttpGet("dentist/{dentistId}")]
        public async Task<IActionResult> GetByDentistId(int dentistId)
        {
            var complaints = await _complaintsService.GetByDentistIdAsync(dentistId);
            return Ok(complaints);
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var complaints = await _complaintsService.GetByPatientIdAsync(patientId);
            return Ok(complaints);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComplaints(int id, [FromBody] ComplaintsUpdateDto complaintsDto)
        {
            if (id != complaintsDto.ComplaintsId)
            {
                return BadRequest();
            }

            var updatedComplaints = await _complaintsService.UpdateComplaintsAsync(complaintsDto);
            if (updatedComplaints == null)
            {
                return NotFound();
            }

            return Ok(updatedComplaints);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaints(int id)
        {
            var complaints = await _complaintsService.GetComplaintsByIdAsync(id);
            if (complaints == null)
            {
                return NotFound();
            }

            await _complaintsService.DeleteComplaintsAsync(id);
            return NoContent();
        }
    }
}
