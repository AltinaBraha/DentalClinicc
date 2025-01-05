using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.MedicalRecordDto
{
    public class MedicalRecordCreateDto
    {
        public string Pershkrimi { get; set; }
        public string Symptoms { get; set; }
        public string Diagnosis { get; set; }
        public string Results { get; set; }
        public int? PatientId { get; set; }
        public int? DentistId { get; set; }
    }
}
