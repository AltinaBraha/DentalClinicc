using ApplicationLayer.DTOs.MedicalRecordDto;
using ApplicationLayer.DTOs.RatingDto;
using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IRatingService
    {
        Task<RatingReadDto> GetRatingByIdAsync(int id);
        Task<List<RatingReadDto>> GetByDentistIdAsync(int dentistId);
        Task<List<RatingReadDto>> GetByPatientIdAsync(int patientId);
        Task<List<RatingReadDto>> GetAllRatingsAsync();
        Task<RatingReadDto> CreateRatingAsync(RatingCreateDto ratingDto);
        Task<RatingReadDto> UpdateRatingAsync(RatingUpdateDto ratingDto);
        Task DeleteRatingAsync(int id);
    }
}
