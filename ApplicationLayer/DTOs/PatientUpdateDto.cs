using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.DTOs
{
    public class PatientUpdateDto
    {
        public int PatientId { get; set; }  // ID e pacientit që duhet përditësuar
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public int NrTelefonit { get; set; }
        public string Email { get; set; }
        //public int? ImageId { get; set; } // ID i fotës që mund të përditësohet
                                          // Mund të shtoni edhe më shumë fushat nëse është e nevojshme
    }

}
