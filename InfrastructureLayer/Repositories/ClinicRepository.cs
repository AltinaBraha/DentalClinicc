﻿using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfrastructureLayer.Repositories
{
    public class ClinicRepository : IClinicRepository
    {
        private readonly ClinicDbContext _context;

        public ClinicRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Clinic> AddAsync(Clinic clinic)
        {
            _context.Clinics.Add(clinic);
            await _context.SaveChangesAsync();
            return clinic;
        }

        public async Task<Clinic?> GetByIdAsync(int id)
        {
            return await _context.Clinics
                .Include(c => c.Departments) 
                    .ThenInclude(d => d.Dentists) 
                .Include(c => c.Departments)
                    .ThenInclude(d => d.Admins) 
                .FirstOrDefaultAsync(c => c.ClinicId == id); 

        }


        public async Task<List<Clinic>> GetAllAsync()
        {
            return await _context.Clinics
                .Include(c => c.Departments) 
                    .ThenInclude(d => d.Dentists) 
                .Include(c => c.Departments)
                    .ThenInclude(d => d.Admins) 
                .ToListAsync(); 
        }


        public async Task<Clinic> UpdateAsync(Clinic clinic)
        {
            _context.Clinics.Update(clinic);
            await _context.SaveChangesAsync();
            return clinic;
        }

        public async Task DeleteAsync(int id)
        {
            var clinic = await _context.Clinics.FindAsync(id);
            if (clinic != null)
            {
                _context.Clinics.Remove(clinic);
                await _context.SaveChangesAsync();
            }
        }

        // metoda GetByLocationName
        public async Task<List<Clinic>> GetByLocationNameAsync(string location)
        {
            return await _context.Clinics
                .Where(c => c.Location.ToLower() == location.ToLower()) 
                .ToListAsync();
        }



        //metoda ExistsClinic
        public async Task<bool> ExistsClinicAsync(string clinicName, string location)
        {
            return await _context.Clinics
                .AnyAsync(c => c.ClinicName.ToLower() == clinicName.ToLower() && c.Location.ToLower() == location.ToLower());
        }

    }
}