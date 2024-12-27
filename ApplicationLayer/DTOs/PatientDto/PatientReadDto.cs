using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs
{
    public class PatientReadDto
    {
        public int PatientId { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public int NrTelefonit { get; set; }
        public string Email { get; set; }

        // public ImageDto Image { get; set; } 

        public int? ImageId { get; set; }
    }
}
