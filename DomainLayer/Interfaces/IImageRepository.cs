using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;


namespace DomainLayer.Interfaces
{   public interface IImageRepository
        {
            Task<Image> AddImageAsync(Image image);
            Task<Image?> GetImageByIdAsync(int imageId);
            Task<bool> DeleteImageAsync(int imageId);
        }
    


}
