using Microsoft.AspNetCore.Http;
using ApplicationLayer.DTOs.AdminDto;
using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ApplicationLayer.DTOs.DepartmentDto;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Authorization;

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


        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var admin = await _service.GetByIdAsync(id);
            return admin != null ? Ok(admin) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] AdminCreateDto adminDto)
        {
            var response = await _service.CreateAdminAsync(adminDto, adminDto.Password);

            if (!(bool)response.Success)
            {
                return BadRequest(response.Message);
            }

            var newAdmin = response.Data?.FirstOrDefault(a => a.Email == adminDto.Email);
            if (newAdmin == null)
            {
                return StatusCode(500, "Admin creation succeeded but admin could not be found.");
            }

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

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> Login(Login request)
        {
            var response = await _service.LoginAsync(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _service.RefreshTokenAsync(refreshToken);
            if (!(bool)response.Success)
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }
    }
}
