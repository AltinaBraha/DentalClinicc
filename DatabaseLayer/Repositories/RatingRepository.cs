using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DatabaseLayer.Repositories
{
    public class RatingRepository : IRatingRepository
    {
        private readonly ClinicDbContext _context;

        public RatingRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Rating> AddAsync(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
            return rating;
        }

        public async Task<Rating> GetByIdAsync(int id)
        {
            return await _context.Ratings.FirstOrDefaultAsync(r => r.RatingId == id);
        }

        public async Task<List<Rating>> GetAllAsync()
        {
            return await _context.Ratings.ToListAsync();
        }

        public async Task<List<Rating>> GetByDentistIdAsync(int dentistId)
        {
            return await _context.Ratings
                .Include(a => a.Patient)
                .Where(a => a.DentistId == dentistId)
                .ToListAsync();
        }

        public async Task<List<Rating>> GetByPatientIdAsync(int patientId)
        {
            return await _context.Ratings
                .Include(a => a.Dentist)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<Rating> UpdateAsync(Rating rating)
        {
            _context.Ratings.Update(rating);
            await _context.SaveChangesAsync();
            return rating;
        }

        public async Task DeleteAsync(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating != null)
            {
                _context.Ratings.Remove(rating);
                await _context.SaveChangesAsync();
            }
        }
    }
}

