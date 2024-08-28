using HastaneNamespace.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaniProjesi.Controllers;

[Authorize]
public class HastaIslemleriController : Controller
{
    private readonly ApplicationDbContext _context;

    public HastaIslemleriController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index(string search, int page = 1)
    {
        int pageSize = 15;
        var hastalar = _context.Hastalar.AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            hastalar = hastalar.Where(h => h.HastaNo.ToString().Contains(search) || h.Adi.Contains(search) || h.Soyadi.Contains(search));
        }

        var paginatedHastalar = hastalar.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return View(paginatedHastalar);
    }
}
