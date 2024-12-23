using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.DepartmentDto
{
    internal class DepartmentUpdateDto
    {
        public int DepartmentId { get; set; }   // Unique identifier for the department
        public string Emri { get; set; }
    }
}
