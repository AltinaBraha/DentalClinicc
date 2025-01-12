using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using SendGrid;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;
        private readonly MailService _mailService;

        public AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper, MailService mailService)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
            _mailService = mailService;
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

            
            var subject = "Appointment Confirmation";
            var body = $"Your appointment has been successfully created. Details: {appointmentDto.Ceshtja}, {appointmentDto.Data}, {appointmentDto.Ora}";
            await _mailService.SendEmailAsync(appointmentDto.Email, subject, body);

            return _mapper.Map<AppointmentReadDto>(createdAppointment);
        }


        public async Task<AppointmentReadDto> UpdateAppointmentAsync(AppointmentUpdateDto appointmentDto)
        {
           
            var appointment = await _appointmentRepository.GetByIdAsync(appointmentDto.AppointmentId);

            if (appointment == null)
            {
                return null; 
            }

            
            appointment.Data = appointmentDto.Data;
            appointment.Ora = appointmentDto.Ora;
            appointment.Ceshtja = appointmentDto.Ceshtja;
            appointment.PatientId = appointmentDto.PatientId;
            appointment.DentistId = appointmentDto.DentistId;

           
            var updatedAppointment = await _appointmentRepository.UpdateAsync(appointment);

            var subject = "Appointment Update";
            var body = $"Your appointment has been updated. New details: {appointmentDto.Ceshtja}, {appointmentDto.Data}, {appointmentDto.Ora}";
            await _mailService.SendEmailAsync(appointmentDto.Email, subject, body);

           
            return _mapper.Map<AppointmentReadDto>(updatedAppointment);
        }

        public async Task DeleteAsync(int id)
        {
            await _appointmentRepository.DeleteAsync(id);
        }

       
    }
}

