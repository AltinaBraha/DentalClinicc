using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities;

namespace DatabaseLayer.Repositories
{
    
        public class ImageRepository : IImageRepository
        {
            private readonly ClinicDbContext _context;

            public ImageRepository(ClinicDbContext context)
            {
                _context = context;
            }

            public async Task<Image> AddImageAsync(Image image)
            {
                _context.Images.Add(image);
                await _context.SaveChangesAsync();
                return image;
            }

            public async Task<Image?> GetImageByIdAsync(int imageId)
            {
                return await _context.Images.FindAsync(imageId);
            }

        public async Task<bool> DeleteImageAsync(int imageId)
        {
            var image = await _context.Images.FindAsync(imageId);
            if (image == null)
            {
                return false;
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
