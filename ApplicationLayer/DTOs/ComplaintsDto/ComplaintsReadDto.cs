using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.ComplaintsDto
{
    public class ComplaintsReadDto
    {

        public int ComplaintsId { get; set; }  
        public string Ankesa { get; set; }

        public int? PatientId { get; set; }
        public string PatientName { get; set; }
        public int DentistId { get; set; }
        public string DentistName { get; set; }

    }
}
