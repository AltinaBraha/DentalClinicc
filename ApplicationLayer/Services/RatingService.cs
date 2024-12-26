using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.RatingDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IMapper _mapper;

        public RatingService(IRatingRepository ratingRepository, IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        public async Task<RatingReadDto> GetRatingByIdAsync(int id)
        {
            var rating = await _ratingRepository.GetByIdAsync(id);
            return _mapper.Map<RatingReadDto>(rating);
        }

        public async Task<List<RatingReadDto>> GetAllRatingsAsync()
        {
            var ratings = await _ratingRepository.GetAllAsync();
            return _mapper.Map<List<RatingReadDto>>(ratings);
        }

        public async Task<RatingReadDto> CreateRatingAsync(RatingCreateDto ratingDto)
        {
            var rating = _mapper.Map<Rating>(ratingDto);
            var createdRating = await _ratingRepository.AddAsync(rating);
            return _mapper.Map<RatingReadDto>(createdRating);
        }

        public async Task<RatingReadDto> UpdateRatingAsync(RatingUpdateDto ratingDto)
        {
            var rating = await _ratingRepository.GetByIdAsync(ratingDto.RatingId);

            if (rating == null)
            {
                return null;
            }

            rating.Sherbimi = ratingDto.Sherbimi;
            rating.sjellja = ratingDto.sjellja;
            rating.PatientId = ratingDto.PatientId;
            rating.DentistId = ratingDto.DentistId;

            var updatedRating = await _ratingRepository.UpdateAsync(rating);
            return _mapper.Map<RatingReadDto>(updatedRating);
        }

        public async Task DeleteRatingAsync(int id)
        {
            await _ratingRepository.DeleteAsync(id);
        }
    }
}
