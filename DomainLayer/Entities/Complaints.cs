﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public class Complaints
    {
        public int ComplaintsId { get; set; }
        public string Ankesa { get; set; }
        public int? PatientId { get; set; }
        public Patient? Patient { get; set; }
        public int DentistId { get; set; }
        public Dentist Dentist { get; set; }
    }
}
