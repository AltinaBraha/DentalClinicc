using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs
{
    public class DentistUpdateDto
    {
        public int DentistId { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public int NrTelefonit { get; set; }
        public string Email { get; set; }
        public string Specializimi { get; set; }
        public TimeSpan OraFillimit { get; set; }
        public TimeSpan OraMbarimit { get; set; }
        //public int? ImageId { get; set; }
        public int DepartmentId { get; set; }
    }
}
