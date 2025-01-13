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
    public class DentistRepository : IDentistRepository
    {
        private readonly ClinicDbContext _context;

        public DentistRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Dentist> AddAsync(Dentist dentist)
        {
            _context.Dentists.Add(dentist);
            await _context.SaveChangesAsync();
            return dentist;
        }

        public async Task<Dentist> GetByIdAsync(int id)
        {
            return await _context.Dentists.Include(p => p.Appointments).FirstOrDefaultAsync(p => p.DentistId == id);
        }

        public async Task<List<Dentist>> GetAllAsync()
        {
            return await _context.Dentists.Include(p => p.Appointments).ToListAsync();
        }

        public async Task<Dentist> UpdateAsync(Dentist dentist)
        {
            _context.Dentists.Update(dentist);
            await _context.SaveChangesAsync();
            return dentist;
        }

        public async Task DeleteAsync(int id)
        {
            var dentist = await _context.Dentists.FindAsync(id);
            if (dentist != null)
            {
                _context.Dentists.Remove(dentist);
                await _context.SaveChangesAsync();
            }
        }
    }
}
