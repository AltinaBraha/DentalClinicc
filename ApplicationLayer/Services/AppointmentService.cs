using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;

        public AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
        }

        public async Task<List<AppointmentReadDto>> GetAllAsync()
        {
            var appointments = await _appointmentRepository.GetAllAsync();
            return _mapper.Map<List<AppointmentReadDto>>(appointments);
        }

        public async Task<AppointmentReadDto> GetAppointmentByIdAsync(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            return _mapper.Map<AppointmentReadDto>(appointment);
        }

        public async Task<List<AppointmentReadDto>> GetByDentistIdAsync(int dentistId)
        {
            var appointments = await _appointmentRepository.GetByDentistIdAsync(dentistId);
            return _mapper.Map<List<AppointmentReadDto>>(appointments);
        }

        public async Task<List<AppointmentReadDto>> GetByPatientIdAsync(int patientId)
        {
            var appointments = await _appointmentRepository.GetByPatientIdAsync(patientId);
            return _mapper.Map<List<AppointmentReadDto>>(appointments);
        }

        public async Task<AppointmentReadDto> CreateAppointmentAsync(AppointmentCreateDto appointmentDto)
        {
            var appointment = _mapper.Map<Appointment>(appointmentDto);
            var createdAppointment = await _appointmentRepository.AddAsync(appointment);
            return _mapper.Map<AppointmentReadDto>(createdAppointment);
        }

        public async Task<AppointmentReadDto> UpdateAppointmentAsync(AppointmentUpdateDto appointmentDto)
        {
            // Get the existing appointment from the repository
            var appointment = await _appointmentRepository.GetByIdAsync(appointmentDto.AppointmentId);

            if (appointment == null)
            {
                return null; // Return null if the appointment is not found
            }

            // Update appointment properties
            appointment.Data = appointmentDto.Data;
            appointment.Ora = appointmentDto.Ora;
            appointment.Ceshtja = appointmentDto.Ceshtja;
            appointment.PatientId = appointmentDto.PatientId;
            appointment.DentistId = appointmentDto.DentistId;

            // Call repository to update the appointment
            var updatedAppointment = await _appointmentRepository.UpdateAsync(appointment);

            // Return the updated appointment as a DTO
            return _mapper.Map<AppointmentReadDto>(updatedAppointment);
        }

        public async Task DeleteAsync(int id)
        {
            await _appointmentRepository.DeleteAsync(id);
        }
    }
}
