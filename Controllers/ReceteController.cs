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

    public IActionResult Index(int hastaNo)
    {
        var hasta = _context.Hastalar.FirstOrDefault(h => h.HastaNo == hastaNo);
        if (hasta == null)
        {
            return NotFound();
        }

        var model = new ReceteViewModel
        {
            HastaNo = hastaNo,
            HastaBilgileri = new HastaViewModel
            {
                Adi = hasta.Adi,
                Soyadi = hasta.Soyadi,
                Adres = hasta.Adres,
                AnneAdi = hasta.AnneAdi,
                BabaAdi = hasta.BabaAdi,
                Telefon = hasta.Telefon
            },
            Doktorlar = _context.Doktorlar
                .Where(d => d.Aktif == "T")
                .Select(d => new SelectListItem
                {
                    Value = d.ID.ToString(),
                    Text = d.Doktor_Adi + " " + d.Doktor_Soyadi
                })
                .ToList(),
            Doktor_Servisleri = _context.Doktor_Servisleri
                .Select(s => new SelectListItem
                {
                    Value = s.ID.ToString(),
                    Text = s.Doktor_Servisi
                })
                .Distinct()
                .ToList()
        };

        PopulateViewModelLists(model);
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

    [HttpPost]
    public IActionResult Kaydet(ReceteViewModel model)
    {
        if (ModelState.IsValid)
        {
            var recete = new Recete
            {
                HastaNo = model.HastaNo,
                Tarih = model.Tarih,
                ReceteTuru = model.ReceteTuru,
                ReceteAitTuru = model.ReceteAitTuru,
                ReceteNotu = model.ReceteNotu,
                OnaylayacakDoktor = model.OnaylayacakDoktorID,
                OnaylananServis = model.OnaylananServis
            };

            _context.Recete.Add(recete);
            _context.SaveChanges();

            return RedirectToAction("Index", new { hastaNo = model.HastaNo });
        }

        PopulateViewModelLists(model);
        return View("Index", model);
    }

    private void PopulateViewModelLists(ReceteViewModel model)
    {
        model.Doktorlar = _context.Doktorlar
            .Where(d => d.Aktif == "T")
            .Select(d => new SelectListItem
            {
                Value = d.ID.ToString(),
                Text = d.Doktor_Adi + " " + d.Doktor_Soyadi
            })
            .ToList();

        model.Doktor_Servisleri = _context.Doktor_Servisleri
            .Select(s => new SelectListItem
            {
                Value = s.ID.ToString(),
                Text = s.Doktor_Servisi
            })
            .Distinct()
            .ToList();
    }
}