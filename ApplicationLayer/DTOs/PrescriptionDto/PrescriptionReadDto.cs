using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.PrescriptionDto
{
    public class PrescriptionReadDto
    {
        public int PrescriptionId { get; set; }
        public string Diagnoza { get; set; }
        public string Medicina { get; set; }
        public int PatientId { get; set; }
        public int DentistId { get; set; }
    }
}
