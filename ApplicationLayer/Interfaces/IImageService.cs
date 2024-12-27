using Microsoft.AspNetCore.Http;
using DomainLayer.Entities;
using System.Threading.Tasks;
using ApplicationLayer.DTOs;

namespace ApplicationLayer.Interfaces
{
    
        public interface IImageService
        {
            Task<ImageResponseDto> UploadImageAsync(ImageUploadRequestDto dto);
            Task<ImageResponseDto?> GetImageByIdAsync(int imageId);
            Task<bool> DeleteImageAsync(int imageId);
        }
    


}
