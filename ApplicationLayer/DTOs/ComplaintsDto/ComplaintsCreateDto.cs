using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.ComplaintsDto
{
    public class ComplaintsCreateDto
    {
        public string Ankesa { get; set; }    
        public int? PatientId { get; set; }    
        public int DentistId { get; set; }
    }
}
