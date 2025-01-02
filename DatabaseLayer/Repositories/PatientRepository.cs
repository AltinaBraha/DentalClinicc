using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseLayer.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ClinicDbContext _context;

        public PatientRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Patient> AddAsync(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient> GetByIdAsync(int id)
        {
            return await _context.Patients.Include(p => p.Appointments).FirstOrDefaultAsync(p => p.PatientId == id);
        }

        public async Task<List<Patient>> GetAllAsync()
        {
            return await _context.Patients.Include(p => p.Appointments).ToListAsync();
        }

        public async Task<Patient> UpdateAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task DeleteAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient != null)
            {
                _context.Patients.Remove(patient);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Patient>> GetByIdsAsync(List<int> patientIds)
        {
            return await _context.Patients
                .Where(p => patientIds.Contains(p.PatientId))
                .ToListAsync();
        }
    }
}
