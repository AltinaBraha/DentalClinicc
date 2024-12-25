using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.AppointmentDto
{
    public class AppointmentCreateDto
    {
        public DateTime? Data { get; set; }
        public string Ceshtja { get; set; }
        public TimeOnly? Ora { get; set; }
        public string Email { get; set; }
        public int PatientId { get; set; }
        public int DentistId { get; set; }

    }
}
