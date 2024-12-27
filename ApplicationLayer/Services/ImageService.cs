using ApplicationLayer.Interfaces;
using DomainLayer.Interfaces;
using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using AutoMapper;
using ApplicationLayer.DTOs;


namespace ApplicationLayer.Services
{
   
        public class ImageService : IImageService
        {
            private readonly IImageRepository _imageRepository;
            private readonly IMapper _mapper;

            public ImageService(IImageRepository imageRepository, IMapper mapper)
            {
                _imageRepository = imageRepository;
                _mapper = mapper;
            }

        public async Task<ImageResponseDto> UploadImageAsync(ImageUploadRequestDto dto)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

            // Krijo direktorinë nëse nuk ekziston
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Rruga e plotë ku do të ruhet foto
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.File.FileName);
            var fullPath = Path.Combine(uploadPath, fileName);

            // Ruaj foton në disk
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            // Krijo objektin për bazën e të dhënave
            var image = new Image
            {
                FileName = fileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/Images/{fileName}" // Ruaj rrugën relative
            };

            var result = await _imageRepository.AddImageAsync(image);

            return _mapper.Map<ImageResponseDto>(result);
        }

        public async Task<ImageResponseDto?> GetImageByIdAsync(int imageId)
            {
                var image = await _imageRepository.GetImageByIdAsync(imageId);
                return image == null ? null : _mapper.Map<ImageResponseDto>(image);
            }

        public async Task<bool> DeleteImageAsync(int imageId)
        {
            // Merr informacionet e imazhit nga baza e të dhënave
            var image = await _imageRepository.GetImageByIdAsync(imageId);
            if (image == null)
            {
                return false; // Nëse nuk ekziston imazhi
            }

            // Përcakto rrugën e skedarit të ruajtur në disk
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.FilePath.TrimStart('/'));

            // Kontrollo nëse skedari ekziston në disk
            if (File.Exists(filePath))
            {
                try
                {
                    // Fshi skedarin fizikisht
                    File.Delete(filePath);
                }
                catch (Exception ex)
                {
                    // Trajto gabimet nëse ndodhin gjatë fshirjes së skedarit
                    Console.WriteLine($"Gabim gjatë fshirjes së skedarit: {ex.Message}");
                    return false;
                }
            }

            // Fshi të dhënat nga baza e të dhënave
            return await _imageRepository.DeleteImageAsync(imageId);
        }

    }
}



