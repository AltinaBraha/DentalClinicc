using ApplicationLayer.DTOs;
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
    public class MedicalRecordController : ControllerBase
    {
        private readonly IMedicalRecordService _medicalRecordService;

        public MedicalRecordController(IMedicalRecordService medicalRecordService)
        {
            _medicalRecordService = medicalRecordService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicalRecordById(int id)
        {
            var medicalRecord = await _medicalRecordService.GetMedicalRecordByIdAsync(id);
            if (medicalRecord == null)
            {
                return NotFound();
            }
            return Ok(medicalRecord);
        }

        [HttpGet("dentist/{dentistId}")]
        public async Task<IActionResult> GetByDentistId(int dentistId)
        {
            var medicalRecords = await _medicalRecordService.GetByDentistIdAsync(dentistId);
            return Ok(medicalRecords);
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var medicalRecords = await _medicalRecordService.GetByPatientIdAsync(patientId);
            return Ok(medicalRecords);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMedicalRecords()
        {
            var medicalRecords = await _medicalRecordService.GetAllMedicalRecordsAsync();
            return Ok(medicalRecords);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMedicalRecord([FromBody] MedicalRecordCreateDto medicalRecordDto)
        {
            var medicalRecord = await _medicalRecordService.CreateMedicalRecordAsync(medicalRecordDto);
            return CreatedAtAction(nameof(GetMedicalRecordById), new { id = medicalRecord.MedicalRecordId }, medicalRecord);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedicalRecord(int id, [FromBody] MedicalRecordUpdateDto medicalRecordDto)
        {
            if (id != medicalRecordDto.MedicalRecordId)
            {
                return BadRequest();
            }

            var updatedMedicalRecord = await _medicalRecordService.UpdateMedicalRecordAsync(medicalRecordDto);
            if (updatedMedicalRecord == null)
            {
                return NotFound();
            }

            return Ok(updatedMedicalRecord);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalRecord(int id)
        {
            var medicalRecord = await _medicalRecordService.GetMedicalRecordByIdAsync(id);
            if (medicalRecord == null)
            {
                return NotFound();
            }

            await _medicalRecordService.DeleteMedicalRecordAsync(id);
            return NoContent();
        }
    }
}
