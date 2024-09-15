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
}