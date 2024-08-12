using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HastaneNamespace.Data;
using HastaneNamespace.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

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

        public IActionResult Index(string search, int page = 1)
        {
            int pageSize = 10;
            var tanilar = from t in _context.Tanilar select t;

            if (!String.IsNullOrEmpty(search))
            {
                tanilar = tanilar.Where(s => s.Tani_kodu.Contains(search) || s.Tani_adi.Contains(search));
            }

            var paginatedTanilar = tanilar.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return View(paginatedTanilar);
        }

        [HttpPost]
        public IActionResult AddToFavorites([FromBody] int id)
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
            }
            return Ok(); // Geriye başarılı olduğunu belirten bir yanıt dön
        }

        [HttpPost]
        public IActionResult RemoveFromFavorites([FromBody] int id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userIdString, out int userId))
            {
                var favori = _context.Favoriler.FirstOrDefault(f => f.Tani_ID == id && f.Kullanici_kodu == userId);
                if (favori != null)
                {
                    _context.Favoriler.Remove(favori);
                    _context.SaveChanges();
                }
            }
            return Ok(); // Geriye başarılı olduğunu belirten bir yanıt dön
        }
    }
}
