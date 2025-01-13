using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfrastructureLayer.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ClinicDbContext _context;

        public AppointmentRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<Appointment>> GetAllAsync()
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Dentist)
                .ToListAsync();
        }

        public async Task<Appointment?> GetByIdAsync(int id)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Dentist)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);
        }

        public async Task<List<Appointment>> GetByDentistIdAsync(int dentistId)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Where(a => a.DentistId == dentistId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetByPatientIdAsync(int patientId)
        {
            return await _context.Appointments
                .Include(a => a.Dentist)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<Appointment> AddAsync(Appointment appointment)
        {
            await _context.Appointments.AddAsync(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task<Appointment> UpdateAsync(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task DeleteAsync(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                throw new KeyNotFoundException($"Appointment with ID {id} not found.");
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
        }
    }
}
