using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.AdminDto
{
    public class AdminCreateDto
    {
        public string Emri { get; set; }       
        public string Mbiemri { get; set; }     
        public string Email { get; set; } 
        public string Password { get; set; }

        public int? ImageId { get; set; }       
        public int DepartmentId { get; set; }
    }
}
