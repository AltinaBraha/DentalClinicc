using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs
{
    public class DentistCreateDto
    {

        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public int NrTelefonit { get; set; }
        public string Email { get; set; }
        public string Specializimi { get; set; }
        public TimeSpan OraFillimit { get; set; }
        public TimeSpan OraMbarimit { get; set; }
        public string Password { get; set; }

        //  public int? ImageId { get; set; }
        //ose public string Image { get; set; }

        public int DepartmentId { get; set; }
    }
}
