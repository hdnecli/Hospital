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
            Alerji_Adi = _context.Alerji.Where(a => a.Aktif == "E").Select(a => a.Alerji_Adi).ToList()
        };
        return View(model);
    }
}