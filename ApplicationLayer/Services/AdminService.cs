using ApplicationLayer.DTOs.AdminDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<List<AdminReadDto>> GetAllAsync()
        {
            var admins = await _adminRepository.GetAllAsync();
            return _mapper.Map<List<AdminReadDto>>(admins);
        }

        public async Task<AdminReadDto?> GetByIdAsync(int id)
        {
            var admin = await _adminRepository.GetByIdAsync(id);
            return admin != null ? _mapper.Map<AdminReadDto>(admin) : null;
        }

        public async Task<List<AdminReadDto>> GetByDepartmentIdAsync(int departmentId)
        {
            var admins = await _adminRepository.GetByDepartmentIdAsync(departmentId);
            return _mapper.Map<List<AdminReadDto>>(admins);
        }

        public async Task<AdminReadDto> CreateAdminAsync(AdminCreateDto adminDto)
        {
            var admin = _mapper.Map<Admin>(adminDto);
            var createdAdmin = await _adminRepository.AddAsync(admin);
            return _mapper.Map<AdminReadDto>(createdAdmin);
        }

        public async Task<AdminReadDto> UpdateAdminAsync(AdminUpdateDto adminDto)
        {
            var admin = await _adminRepository.GetByIdAsync(adminDto.AdminId);

            if (admin == null)
            {
                return null;
            }

            admin.Emri = adminDto.Emri;
            admin.Mbiemri = adminDto.Mbiemri;
            admin.Email = adminDto.Email;
            admin.ImageId = adminDto.ImageId;
            admin.DepartmentId = adminDto.DepartmentId;

            var updatedAdmin = await _adminRepository.UpdateAsync(admin);

            return _mapper.Map<AdminReadDto>(updatedAdmin);
        }

        public async Task DeleteAsync(int id)
        {
            await _adminRepository.DeleteAsync(id);
        }
    }
}
