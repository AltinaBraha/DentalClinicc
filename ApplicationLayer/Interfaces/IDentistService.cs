using ApplicationLayer.DTOs;
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
        Task<DentistReadDto> CreateDentistAsync(DentistCreateDto dentistDto);
        Task<DentistReadDto> UpdateDentistAsync(DentistUpdateDto dentistDto);
        Task DeleteDentistAsync(int id);
    }
}
