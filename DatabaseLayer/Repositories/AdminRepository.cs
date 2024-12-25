using DatabaseLayer;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfrastructureLayer.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ClinicDbContext _context;

        public AdminRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<Admin>> GetAllAsync()
        {
            return await _context.Set<Admin>()
                .Include(a => a.Image)
                .Include(a => a.Department)
                .ToListAsync();
        }

        public async Task<Admin?> GetByIdAsync(int id)
        {
            return await _context.Set<Admin>()
                .Include(a => a.Image)
                .Include(a => a.Department)
                .FirstOrDefaultAsync(a => a.AdminId == id);
        }

        public async Task<List<Admin>> GetByDepartmentIdAsync(int departmentId)
        {
            return await _context.Set<Admin>()
                .Include(a => a.Image)
                .Where(a => a.DepartmentId == departmentId)
                .ToListAsync();
        }

        public async Task<Admin> AddAsync(Admin admin)
        {
            await _context.Set<Admin>().AddAsync(admin);
            await _context.SaveChangesAsync();
            return admin;
        }

        public async Task<Admin> UpdateAsync(Admin admin)
        {
            _context.Set<Admin>().Update(admin);
            await _context.SaveChangesAsync();
            return admin;
        }

        public async Task DeleteAsync(int id)
        {
            var admin = await GetByIdAsync(id);
            if (admin != null)
            {
                _context.Set<Admin>().Remove(admin);
                await _context.SaveChangesAsync();
            }
        }
    }
}

