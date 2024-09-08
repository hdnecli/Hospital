using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models
{
    public class ReceteViewModel
    {
        public int HastaNo { get; set; }
        public required string Adi { get; set; }
        public required string Soyadi { get; set; }
        public required string BabaAdi { get; set; }
        public required string AnneAdi { get; set; }
        public required DateTime DogumTarihi { get; set; }
        public required string Telefon { get; set; }
        public required string Adres { get; set; }
        public required string Aktif { get; set; } = "1";
        public List<SelectListItem> Doktorlar { get; set; } = new List<SelectListItem>();
        public List<SelectListItem> Doktor_Servisleri { get; set; } = new List<SelectListItem>();
        public int ReceteTuru { get; set; }
        public int ReceteAitTuru { get; set; }
        public string? ReceteNotu { get; set; }
        public int OnaylayacakDoktorID { get; set; }
        public int OnaylananServis { get; set; }
        public DateTime Tarih { get; set; } = DateTime.Now;
    }
}