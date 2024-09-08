using System;
using System.ComponentModel.DataAnnotations;

namespace TaniProjesi.Models
{
    public class Recete
    {
        public int ID { get; set; }
        public int HastaNo { get; set; }
        public DateTime Tarih { get; set; }
        public int ReceteTuru { get; set; }
        public int ReceteAitTuru { get; set; }
        public string? ReceteNotu { get; set; }
        public int OnaylayacakDoktor { get; set; }
        public int OnaylananServis { get; set; }
    }
}
