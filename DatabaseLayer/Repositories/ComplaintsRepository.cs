using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseLayer.Repositories
{
    public class ComplaintsRepository : IComplaintsRepository
    {
        private readonly ClinicDbContext _context;

        public ComplaintsRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Complaints> AddAsync(Complaints complaint)
        {
            _context.Complaint.Add(complaint);
            await _context.SaveChangesAsync();
            return complaint;
        }

        public async Task<Complaints> GetByIdAsync(int id)
        {
            return await _context.Complaint.FirstOrDefaultAsync(p => p.ComplaintsId == id);
        }

        public async Task<List<Complaints>> GetByDentistIdAsync(int dentistId)
        {
            return await _context.Complaint
                .Include(a => a.Patient)
                .Where(a => a.DentistId == dentistId)
                .ToListAsync();
        }

        public async Task<List<Complaints>> GetByPatientIdAsync(int patientId)
        {
            return await _context.Complaint
                .Include(a => a.Dentist)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }
        public async Task<List<Complaints>> GetAllAsync()
        {
            return await _context.Complaint.ToListAsync();
        }

        public async Task<Complaints> UpdateAsync(Complaints complaint)
        {
            _context.Complaint.Update(complaint);
            await _context.SaveChangesAsync();
            return complaint;
        }

        public async Task DeleteAsync(int id)
        {
            var complaint = await _context.Complaint.FindAsync(id);
            if (complaint != null)
            {
                _context.Complaint.Remove(complaint);
                await _context.SaveChangesAsync();
            }
        }
    }
}
