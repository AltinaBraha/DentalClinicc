using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IMedicalRecordRepository
    {
        Task<MedicalRecord> AddAsync(MedicalRecord medicalRecord);
        Task<MedicalRecord> GetByIdAsync(int id);
        Task<List<MedicalRecord>> GetAllAsync();
        Task<MedicalRecord> UpdateAsync(MedicalRecord medicalRecord);
        Task DeleteAsync(int id);
    }
}
