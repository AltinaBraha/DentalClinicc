using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.PrescriptionDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        private readonly IPrescriptionService _prescriptionService;

        public PrescriptionController(IPrescriptionService prescriptionService)
        {
            _prescriptionService = prescriptionService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescriptionById(int id)
        {
            var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }
            return Ok(prescription);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPrescriptions()
        {
            var prescriptions = await _prescriptionService.GetAllPrescriptionsAsync();
            return Ok(prescriptions);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrescription([FromBody] PrescriptionCreateDto prescriptionDto)
        {
            var prescription = await _prescriptionService.CreatePrescriptionAsync(prescriptionDto);
            return CreatedAtAction(nameof(GetPrescriptionById), new { id = prescription.PrescriptionId }, prescription);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePrescription(int id, [FromBody] PrescriptionUpdateDto prescriptionDto)
        {
            if (id != prescriptionDto.PrescriptionId)
            {
                return BadRequest();
            }

            var updatedPrescription = await _prescriptionService.UpdatePrescriptionAsync(prescriptionDto);
            if (updatedPrescription == null)
            {
                return NotFound();
            }

            return Ok(updatedPrescription);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescription(int id)
        {
            var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }

            await _prescriptionService.DeletePrescriptionAsync(id);
            return NoContent();
        }
    }
}
