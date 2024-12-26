using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.RatingDto;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRatingById(int id)
        {
            var rating = await _ratingService.GetRatingByIdAsync(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRatings()
        {
            var ratings = await _ratingService.GetAllRatingsAsync();
            return Ok(ratings);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRating([FromBody] RatingCreateDto ratingDto)
        {
            var rating = await _ratingService.CreateRatingAsync(ratingDto);
            return CreatedAtAction(nameof(GetRatingById), new { id = rating.RatingId }, rating);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRating(int id, [FromBody] RatingUpdateDto ratingDto)
        {
            if (id != ratingDto.RatingId)
            {
                return BadRequest();
            }

            var updatedRating = await _ratingService.UpdateRatingAsync(ratingDto);
            if (updatedRating == null)
            {
                return NotFound();
            }

            return Ok(updatedRating);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _ratingService.GetRatingByIdAsync(id);
            if (rating == null)
            {
                return NotFound();
            }

            await _ratingService.DeleteRatingAsync(id);
            return NoContent();
        }
    }
}

