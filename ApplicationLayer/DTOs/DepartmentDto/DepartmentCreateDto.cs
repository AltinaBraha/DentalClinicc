using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ApplicationLayer.DTOs.DepartmentDto
{
    public class DepartmentCreateDto
    {
        public string Emri { get; set; }
        public int ClinicId { get; set; }
    }
}