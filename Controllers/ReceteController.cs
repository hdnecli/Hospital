using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Controllers;

[Authorize]
public class ReceteController : Controller{
    private readonly ApplicationDbContext _context;

    public ReceteController(ApplicationDbContext context){
        _context = context;
    }

    public IActionResult Index(int hastaNo, string search)
    {
        var hasta = _context.Hastalar.FirstOrDefault(h => h.HastaNo == hastaNo);
        if (hasta == null)
        {
            return NotFound();
        }

        var doktorlar = _context.Doktorlar
            .Where(d => d.Aktif == "T")
            .Select(d => new SelectListItem
            {
                Value = d.ID.ToString(),
                Text = d.Doktor_Adi + " " + d.Doktor_Soyadi
            })
            .ToList();

        var servisler = _context.Doktor_Servisleri
            .Select(s => new SelectListItem
            {
                Value = s.ID.ToString(),
                Text = s.Doktor_Servisi
            })
            .Distinct()
            .ToList();

        var model = new ReceteViewModel
        {
            Hasta = hasta,
            Ilaclar = new List<Ilaclar>(),
            Doktorlar = doktorlar,
            Doktor_Servisleri = servisler
        };

        if (!string.IsNullOrEmpty(search))
        {
            var ilaclar = _context.Ilaclar
                .Where(i => i.Ilac_adi.Contains(search) || i.Barkod.Contains(search))
                .Take(10)  
                .ToList();

            model.Ilaclar = ilaclar;
        }

        return View(model);
    }

    [HttpGet]
    public IActionResult AraIlac(string search, int hastaNo)
    {
        var ilaclar = _context.Ilaclar
            .Where(i => i.Ilac_adi.Contains(search) || i.Barkod.Contains(search) && i.Sgk_oder_mi)
            .Take(10)
            .Select(i => new {
                id = i.ID,
                ilac_adi = i.Ilac_adi,
                kutu = "", 
                doz = ""
            })
            .ToList();

        var verilisYollari = _context.Verilis_Yollari
            .Where(v => v.Aktif == "E")
            .OrderBy(v => v.ID)
            .Select(v => new { id = v.ID, adi = v.Verilis_Yolu_Adi })
            .ToList();

        var periyotBirimleri = new List<object>
        {
            new { id = 0, adi = "Gün" },
            new { id = 1, adi = "Hafta" },
            new { id = 2, adi = "Ay" },
            new { id = 3, adi = "Yıl" }
        };

        return Json(new { ilaclar, verilisYollari, periyotBirimleri });
    }
}