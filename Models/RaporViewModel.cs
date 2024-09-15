using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Models;

public class RaporViewModel
{
    public int HastaNo { get; set; }
    public DateTime BaslangicTarihi { get; set; } = DateTime.Now;
    public DateTime BitisTarihi { get; set; } = DateTime.Now;
    public string? RaporBitiminde { get; set; }
    public string? Rapor_Notu { get; set; }
    public List<SelectListItem> Doktorlar { get; set; } = new List<SelectListItem>();
    public List<SelectListItem> Doktor_Servisleri { get; set; } = new List<SelectListItem>();
    public int OnaylayacakDoktor { get; set; }
    public int OnaylananServis { get; set; }
    public List<string> Tanilar { get; set; } = new List<string>();
}