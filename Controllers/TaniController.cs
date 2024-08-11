using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HastaneNamespace.Data;
using HastaneNamespace.Models;
using System.Security.Claims;


namespace TaniProjesi.Controllers
{
    [Authorize]
    public class TaniController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TaniController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var tanilar = _context.Tanilar.ToList();
            return View(tanilar);
        }

            [HttpPost]
        public IActionResult AddToFavorites(int id)
        {
            var tani = _context.Tanilar.Find(id);
            if (tani != null)
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (int.TryParse(userIdString, out int userId))
                {
                    var favori = new Favori
                    {
                        Tani_ID = tani.ID,
                        Kullanici_kodu = userId
                    };
                    _context.Favoriler.Add(favori);
                    _context.SaveChanges();
                }
                else
                {
                    // userIdString null veya geçersizse yapılacak işlem
                    // Burada hata loglama veya uygun bir işlem yapabilirsin.
                }
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
