using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;

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
        };
        return View(model);
    }
}