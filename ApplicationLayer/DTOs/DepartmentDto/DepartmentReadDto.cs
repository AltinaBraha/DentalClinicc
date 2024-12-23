using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs
{
    public class DepartmentReadDto
    {
        public int DepartmentId { get; set; }
        public string Emri { get; set; }
        public List<string> Dentists { get; set; } = new List<string>();
        public List<string> Admins { get; set; } = new List<string>();
    }
}

