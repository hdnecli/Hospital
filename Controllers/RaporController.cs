using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace TaniProjesi.Controllers;

[Authorize]
public class RaporController : Controller  
{
    private readonly ApplicationDbContext _context;

    public RaporController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index(int hastaNo)
    {
        var model = new RaporViewModel {
            HastaNo = hastaNo,
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
        return View(model);
    }

    [HttpPost]
    public IActionResult Kaydet(RaporViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View("Index", model);
        }

        var raporKayit = KaydetRapor(model);
        _context.Rapor_Bilgileri.Add(raporKayit);
        _context.SaveChanges();

        return RedirectToAction("Index", "HastaIslemleri");
    }

    [HttpPost]
    public IActionResult RaporYazdir(RaporViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View("Index", model);
        }

        var raporKayit = KaydetRapor(model);
        _context.Rapor_Bilgileri.Add(raporKayit);
        _context.SaveChanges();

        return View("RaporYazdir", model);
    }

    private Rapor_Bilgileri KaydetRapor(RaporViewModel model)
    {
        string formattedTanilar = model.Tanilar != null && model.Tanilar.Any() 
            ? string.Join(", ", model.Tanilar.Select(t => t.Trim('"'))) 
            : "";

        var rapor = new Rapor_Bilgileri
        {
            HastaNo = model.HastaNo,
            BaslangicTarihi = model.BaslangicTarihi,
            BitisTarihi = model.BitisTarihi,
            RaporBitiminde = model.RaporBitiminde,
            Rapor_Notu = model.Rapor_Notu,
            Tanilar = formattedTanilar,
            OnaylayacakDoktor = model.OnaylayacakDoktor,
            OnaylananServis = model.OnaylananServis
        };

        return rapor;
    }
}