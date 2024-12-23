using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.ContactDto
{
    public class ContactReadDto
    {
        public int ContactId { get; set; }       
        public string Mesazhi { get; set; }         
        public DateTime? MessageDate { get; set; }  

        public int PatientId { get; set; }         
      
    }
}
