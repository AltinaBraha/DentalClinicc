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
    public class MedicalRecordRepository : IMedicalRecordRepository
    {
        private readonly ClinicDbContext _context;

        public MedicalRecordRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<MedicalRecord> AddAsync(MedicalRecord medicalRecord)
        {
            _context.MedicalRecords.Add(medicalRecord);
            await _context.SaveChangesAsync();
            return medicalRecord;
        }

        public async Task<MedicalRecord> GetByIdAsync(int id)
        {
            return await _context.MedicalRecords.FirstOrDefaultAsync(p => p.MedicalRecordId == id);
        }

        public async Task<List<MedicalRecord>> GetByDentistIdAsync(int dentistId)
        {
            return await _context.MedicalRecords
                .Include(a => a.Patient)
                .Where(a => a.DentistId == dentistId)
                .ToListAsync();
        }

        public async Task<List<MedicalRecord>> GetByPatientIdAsync(int patientId)
        {
            return await _context.MedicalRecords
                .Include(a => a.Dentist)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<List<MedicalRecord>> GetAllAsync()
        {
            return await _context.MedicalRecords.ToListAsync();
        }

        public async Task<MedicalRecord> UpdateAsync(MedicalRecord medicalRecord)
        {
            _context.MedicalRecords.Update(medicalRecord);
            await _context.SaveChangesAsync();
            return medicalRecord;
        }

        public async Task DeleteAsync(int id)
        {
            var medicalRecord = await _context.MedicalRecords.FindAsync(id);
            if (medicalRecord != null)
            {
                _context.MedicalRecords.Remove(medicalRecord);
                await _context.SaveChangesAsync();
            }
        }
    }
}
