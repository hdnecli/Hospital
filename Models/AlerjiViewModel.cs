using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models
{
    public class AlerjiViewModel
    {
        public int HastaNo { get; set; }
        public List<string> Alerji_Adi { get; set; } = new List<string>();
        public string? AlerjiNotu { get; set; }
        public List<SelectListItem> Doktorlar { get; set; } = new List<SelectListItem>();
        public int OnaylayacakDoktorID { get; set; } = 0;
    }
}