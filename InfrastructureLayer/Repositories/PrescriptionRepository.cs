using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfrastructureLayer.Repositories
{
    public class PrescriptionRepository : IPrescriptionRepository
    {
        private readonly ClinicDbContext _context;

        public PrescriptionRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Prescription> AddAsync(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            return prescription;
        }

        public async Task<Prescription> GetByIdAsync(int id)
        {
            return await _context.Prescriptions.FirstOrDefaultAsync(p => p.PrescriptionId == id);
        }

        public async Task<List<Prescription>> GetByDentistIdAsync(int dentistId)
        {
            return await _context.Prescriptions
                .Include(a => a.Patient)
                .Where(a => a.DentistId == dentistId)
                .ToListAsync();
        }

        public async Task<List<Prescription>> GetByPatientIdAsync(int patientId)
        {
            return await _context.Prescriptions
                .Include(a => a.Dentist)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<List<Prescription>> GetAllAsync()
        {
            return await _context.Prescriptions.ToListAsync();
        }

        public async Task<Prescription> UpdateAsync(Prescription prescription)
        {
            _context.Prescriptions.Update(prescription);
            await _context.SaveChangesAsync();
            return prescription;
        }

        public async Task DeleteAsync(int id)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription != null)
            {
                _context.Prescriptions.Remove(prescription);
                await _context.SaveChangesAsync();
            }
        }
    }
}
