using Microsoft.AspNetCore.Http;
using ApplicationLayer.DTOs.AdminDto;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ApplicationLayer.DTOs.DepartmentDto;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;

        public AdminController(IAdminService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var admins = await _service.GetAllAsync();
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var admin = await _service.GetByIdAsync(id);
            return admin != null ? Ok(admin) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] AdminCreateDto adminDto)
        {
            var newAdmin = await _service.CreateAdminAsync(adminDto);
            return CreatedAtAction(nameof(GetById), new { id = newAdmin.AdminId }, newAdmin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AdminUpdateDto adminDto)
        {
            adminDto.AdminId = id;
            var updatedAdmin = await _service.UpdateAdminAsync(adminDto);
            return updatedAdmin != null ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
