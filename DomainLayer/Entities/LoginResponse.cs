using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public class LoginResponse
    {
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public Admin? Admin { get; set; }
        public Patient? Patient { get; set; }
        public Dentist? Dentist { get; set; }

    }
}
