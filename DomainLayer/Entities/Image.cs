using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DomainLayer.Entities
{
    public class Image
    {
        public int ImageId { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
        public string FileName { get; set; }
        public string? FileDescription { get; set; }
        public string FileExtension { get; set; }
        public long FileSizeInBytes { get; set; }
        public string FilePath { get; set; }
        public ICollection<Admin> Admins { get; set; } = new List<Admin>();
        public ICollection<Patient> Patients { get; set; } = new List<Patient>();
        public ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
    }
}
