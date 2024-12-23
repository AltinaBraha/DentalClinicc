using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.ComplaintsDto
{
    internal class ComplaintsUpdateDto
    {
        public int ComplaintsId { get; set; }  
        public string Ankesa { get; set; }    
        public int? PatientId { get; set; }   
        public int DentistId { get; set; }
    }
}
