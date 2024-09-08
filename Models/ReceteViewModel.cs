using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models
{
    public class ReceteViewModel
    {
        public required Hastalar Hasta { get; set; }
        public required List<Ilaclar> Ilaclar { get; set; }
        public required List<SelectListItem> Doktorlar { get; set; }
        public required List<SelectListItem> Doktor_Servisleri { get; set; }
    }
}