using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.AdminDto;
using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IDentistService
    {
        Task<DentistReadDto> GetDentistByIdAsync(int id);
        Task<List<DentistReadDto>> GetAllDentistsAsync();
        Task<ServiceResponse<List<Dentist>?>> CreateDentistAsync(DentistCreateDto dentist, string password); 
        Task<DentistReadDto> UpdateDentistAsync(DentistUpdateDto dentistDto);
        Task DeleteDentistAsync(int id);
        Task<ServiceResponse<LoginResponse>> LoginAsync(string email, string password);
        Task<ServiceResponse<LoginResponse>> RefreshTokenAsync(string refreshToken);
    }
}
