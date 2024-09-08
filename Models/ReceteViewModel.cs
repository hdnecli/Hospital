using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models
{
    public class ReceteViewModel
    {
        public int HastaNo { get; set; }
        public List<Ilaclar> Ilaclar { get; set; } = new List<Ilaclar>();
        public List<SelectListItem> Doktorlar { get; set; } = new List<SelectListItem>();
        public List<SelectListItem> Doktor_Servisleri { get; set; } = new List<SelectListItem>();
        public int ReceteTuru { get; set; }
        public int ReceteAitTuru { get; set; }
        public string? ReceteNotu { get; set; }
        public int OnaylayacakDoktorID { get; set; }
        public int OnaylananServis { get; set; }
        public DateTime Tarih { get; set; } = DateTime.Now;
        public HastaViewModel HastaBilgileri { get; set; } = new HastaViewModel();
    }

    public class HastaViewModel
    {
        public string Adi { get; set; } = string.Empty;
        public string Soyadi { get; set; } = string.Empty;
        public string Adres { get; set; } = string.Empty;
        public string AnneAdi { get; set; } = string.Empty;
        public string BabaAdi { get; set; } = string.Empty;
        public string Telefon { get; set; } = string.Empty;
    }

    public enum ReceteTuruEnum
    {
        Normal = 0,
        Kirmizi = 1,
        Yesil = 2,
        Mor = 3,
        Turuncu = 4
    }
}