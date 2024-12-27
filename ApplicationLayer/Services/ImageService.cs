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

            // Përdor emrin origjinal të skedarit
            var sanitizedFileName = Path.GetFileName(dto.File.FileName); // Sigurohuni që të jetë vetëm emri
            var fullPath = Path.Combine(uploadPath, sanitizedFileName);

            // Kontrolloni nëse ekziston një skedar me të njëjtin emër
            if (File.Exists(fullPath))
            {
                throw new Exception("Një skedar me këtë emër ekziston tashmë. Ju lutemi provoni me një emër tjetër.");
            }

            // Ruaj foton në disk
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            // Krijo objektin për bazën e të dhënave
            var image = new Image
            {
                FileName = sanitizedFileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/Images/{sanitizedFileName}" // Ruaj rrugën relative
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
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", image.FilePath.TrimStart('/'));

            // Kontrollo nëse skedari ekziston në disk
            if (File.Exists(filePath))
            {
                try
                {
                    // Fshi skedarin fizikisht
                    File.Delete(filePath);
                    Console.WriteLine($"Skedari {filePath} u fshi me sukses.");
                }
                catch (Exception ex)
                {
                    // Trajto gabimet nëse ndodhin gjatë fshirjes së skedarit
                    Console.WriteLine($"Gabim gjatë fshirjes së skedarit: {ex.Message}");
                    return false;
                }
            }
            else
            {
                Console.WriteLine($"Skedari {filePath} nuk ekziston në disk.");
            }

            // Fshi të dhënat nga baza e të dhënave
            var result = await _imageRepository.DeleteImageAsync(imageId);

            // Kthe true nëse imazhi u fshi me sukses nga baza e të dhënave
            return result;
        }


    }
}



