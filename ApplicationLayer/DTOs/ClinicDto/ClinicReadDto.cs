using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.ClinicDto
{
    public class ClinicReadDto
    {
        public int ClinicId { get; set; }
        public string ClinicName { get; set; }

        public string Location { get; set; }
    }
}
