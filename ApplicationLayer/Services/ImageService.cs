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

            
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            
            var sanitizedFileName = Path.GetFileName(dto.File.FileName); 
            var fullPath = Path.Combine(uploadPath, sanitizedFileName);

            
            if (File.Exists(fullPath))
            {
                throw new Exception("Një skedar me këtë emër ekziston tashmë. Ju lutemi provoni me një emër tjetër.");
            }

            
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            
            var image = new Image
            {
                FileName = sanitizedFileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/Images/{sanitizedFileName}" 
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
           
            var image = await _imageRepository.GetImageByIdAsync(imageId);
            if (image == null)
            {
                return false; 
            }

            
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", image.FilePath.TrimStart('/'));

            
            if (File.Exists(filePath))
            {
                try
                {
                   
                    File.Delete(filePath);
                    Console.WriteLine($"Skedari {filePath} u fshi me sukses.");
                }
                catch (Exception ex)
                {
                    
                    Console.WriteLine($"Gabim gjatë fshirjes së skedarit: {ex.Message}");
                    return false;
                }
            }
            else
            {
                Console.WriteLine($"Skedari {filePath} nuk ekziston në disk.");
            }

            
            var result = await _imageRepository.DeleteImageAsync(imageId);

            
            return result;
        }


    }
}



