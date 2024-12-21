using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public class Prescription
    {
        public int PrescriptionId { get; set; }
        public string Diagnoza { get; set; }
        public string Medicina { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public int DentistId { get; set; }
        public Dentist Dentist { get; set; }
    }
}
