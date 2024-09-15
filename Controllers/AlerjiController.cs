using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TaniProjesi.Controllers;

[Authorize]
public class AlerjiController : Controller
{
    private readonly ApplicationDbContext _context;

    public AlerjiController(ApplicationDbContext context){
        _context = context;
    }

    public IActionResult Index(int hastaNo)
    {
        var model = new AlerjiViewModel { 
            HastaNo = hastaNo,
            Alerji_Adi = _context.Alerji.Where(a => a.Aktif == "E").Select(a => a.Alerji_Adi).ToList(),
            Guncelleyen = User.Identity?.Name ?? "Bilinmeyen Kullanıcı",
        };
        return View(model);
    }

    [HttpPost]
    public IActionResult Kaydet(AlerjiViewModel model)
    {
        if (ModelState.IsValid)
        {
            var kullaniciAdi = User.Identity?.Name ?? "Bilinmeyen Kullanıcı";

            var alerjiKayit = new Alerji_Kayit
            {
                HastaNo = model.HastaNo,
                Alerji_Adi = string.Join(", ", model.Alerji_Adi ?? new List<string>()),
                Alerji_Notu = model.Alerji_Notu,
                Guncelleyen = kullaniciAdi,
                Guncelleme_Tarihi = DateTime.Now.Date 
            };

            _context.Alerji_Kayit.Add(alerjiKayit);
            _context.SaveChanges();

            return RedirectToAction("Index", "HastaIslemleri");
        }

        // Eğer model geçerli değilse, formu tekrar göster
        return View("Index", model);
    }
}