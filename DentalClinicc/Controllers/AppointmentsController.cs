using Microsoft.AspNetCore.Http;
using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ApplicationLayer.DTOs.PatientDto;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentsController(IAppointmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _service.GetAllAsync();
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _service.GetAppointmentByIdAsync(id);
            return appointment != null ? Ok(appointment) : NotFound();
        }

        [HttpGet("dentist/{dentistId}")]
        public async Task<IActionResult> GetByDentistId(int dentistId)
        {
            var appointments = await _service.GetByDentistIdAsync(dentistId);
            return Ok(appointments);
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var appointments = await _service.GetByPatientIdAsync(patientId);
            return Ok(appointments);
        }



        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentCreateDto appointmentDto)
        {
            var appointment = await _service.CreateAppointmentAsync(appointmentDto);
            return CreatedAtAction(nameof(GetById), new { id = appointment.AppointmentId }, appointment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AppointmentUpdateDto dto)
        {
            dto.AppointmentId = id;
            var updatedAppointment = await _service.UpdateAppointmentAsync(dto);
            return updatedAppointment != null ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
