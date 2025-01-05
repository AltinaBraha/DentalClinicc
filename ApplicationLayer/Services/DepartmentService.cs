using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.DepartmentDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<DepartmentReadDto> GetDepartmentByIdAsync(int id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);
            return _mapper.Map<DepartmentReadDto>(department);
        }

        public async Task<List<DepartmentReadDto>> GetAllDepartmentsAsync()
        {
            var departments = await _departmentRepository.GetAllAsync();
            return _mapper.Map<List<DepartmentReadDto>>(departments);
        }

        public async Task<DepartmentReadDto> CreateDepartmentAsync(DepartmentCreateDto departmentDto)
        {
            var department = _mapper.Map<Department>(departmentDto);
            var createdDepartment = await _departmentRepository.AddAsync(department);
            return _mapper.Map<DepartmentReadDto>(createdDepartment);
        }

        public async Task<DepartmentReadDto> UpdateDepartmentAsync(DepartmentUpdateDto departmentDto)
        {
            var department = await _departmentRepository.GetByIdAsync(departmentDto.DepartmentId);

            if (department == null)
            {
                return null; // Department not found
            }

            // Update department properties
            department.Emri = departmentDto.Emri;
            department.ClinicId = departmentDto.ClinicId;

            // Call repository to update department
            var updatedDepartment = await _departmentRepository.UpdateAsync(department);

            return _mapper.Map<DepartmentReadDto>(updatedDepartment);
        }

        public async Task DeleteDepartmentAsync(int id)
        {
            await _departmentRepository.DeleteAsync(id);
        }

        public async Task<int> CountDepartmentsByClinicNameAsync(string clinicName)
        {
            return await _departmentRepository.CountByClinicNameAsync(clinicName);
        }
    }
}
