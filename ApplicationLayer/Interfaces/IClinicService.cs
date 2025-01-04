using ApplicationLayer.DTOs.ClinicDto;
using ApplicationLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IClinicService
    {
        Task<ClinicReadDto> GetClinicByIdAsync(int id);
        Task<List<ClinicReadDto>> GetAllClinicsAsync();
        Task<ClinicReadDto> CreateClinicAsync(ClinicCreateDto clinicDto);
        Task<ClinicReadDto> UpdateClinicAsync(ClinicUpdateDto clinicDto);
        Task DeleteClinicAsync(int id);

        // metoda për të marrë klinikat sipas lokacionit
        Task<List<ClinicReadDto>> GetClinicsByLocationAsync(string location);

        // metoda për të kontrolluar ekzistencën e një klinike
        Task<bool> ClinicExistsAsync(string clinicName, string location);
    }
}
