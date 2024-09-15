using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models
{
    public class AlerjiViewModel
    {
        public int HastaNo { get; set; }
        public List<string> Alerji_Adi { get; set; } = new List<string>();
        public string? Alerji_Notu { get; set; }
        public string? Guncelleyen { get; set; }
        public DateTime? Guncelleme_Tarihi { get; set; }
    }
}