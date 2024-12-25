using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.AdminDto
{
    public class AdminUpdateDto
    {
        public int AdminId { get; set; }       
        public string Emri { get; set; }        
        public string Mbiemri { get; set; }    
        public string Email { get; set; }     
        public int? ImageId { get; set; }       
        public int DepartmentId { get; set; }
    }
}
