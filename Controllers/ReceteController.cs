using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;
using System.Security.Claims;
using System.Collections.Generic;

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

        var model = new ReceteViewModel
        {
            Hasta = hasta,
            Ilaclar = new List<Ilaclar>()
        };

        if (!string.IsNullOrEmpty(search))
        {
            var ilaclar = _context.Ilaclar
                .Where(i => i.Ilac_adi.Contains(search) || i.Barkod.Contains(search))
                .Take(10)  // Sonuç sayısını sınırlandırabilirsiniz
                .ToList();

            model.Ilaclar = ilaclar;
        }

        return View(model);
    }

    [HttpGet]
    public IActionResult AraIlac(string search, int hastaNo)
    {
        var ilaclar = _context.Ilaclar
            .Where(i => i.Ilac_adi.Contains(search) || i.Barkod.Contains(search))
            .Take(10)
            .Select(i => new {
                id = i.ID,
                ilac_adi = i.Ilac_adi,
                kutu = "", // Bu alanları veritabanınızdan alacak şekilde güncelleyin
                doz = "",
                verilis_yolu = ""
            })
            .ToList();

        return Json(ilaclar);
    }
}