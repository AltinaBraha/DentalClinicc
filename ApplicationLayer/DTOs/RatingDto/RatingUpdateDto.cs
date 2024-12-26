using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs.RatingDto
{
    public class RatingUpdateDto
    {
        public int RatingId { get; set; }
        public string? Sherbimi { get; set; }
        public string? sjellja { get; set; }
        public int? PatientId { get; set; }
        public int DentistId { get; set; }
    }
}
