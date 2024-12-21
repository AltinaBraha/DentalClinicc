using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public class Department
    {
        public int DepartmentId { get; set; }

        public string Emri { get; set; }
        public ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
        public ICollection<Admin> Admins { get; set; } = new List<Admin>();
    }
}
