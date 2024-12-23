using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.DepartmentDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var department = await _departmentService.GetDepartmentByIdAsync(id);
            if (department == null) return NotFound();
            return Ok(department);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _departmentService.GetAllDepartmentsAsync();
            return Ok(departments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] DepartmentCreateDto departmentDto)
        {
            var department = await _departmentService.CreateDepartmentAsync(departmentDto);
            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.DepartmentId }, department);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] DepartmentUpdateDto departmentDto)
        {
            if (id != departmentDto.DepartmentId) return BadRequest();

            var updatedDepartment = await _departmentService.UpdateDepartmentAsync(departmentDto);
            if (updatedDepartment == null) return NotFound();

            return Ok(updatedDepartment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _departmentService.GetDepartmentByIdAsync(id);
            if (department == null) return NotFound();

            await _departmentService.DeleteDepartmentAsync(id);
            return NoContent();
        }
    }
}
