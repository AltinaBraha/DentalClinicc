using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public class Clinic
    {
        public int ClinicId { get; set; }

        public string ClinicName { get; set; }

        public string Location { get; set; }

        public ICollection<Department> Departments { get; set; } = new List<Department>();
    }
}
