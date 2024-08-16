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

        public IActionResult Index(string search, int page = 1, bool isFavorites = false)
        {
            int pageSize = 15;
            var tanilar = from t in _context.Tani select t;

            if (!String.IsNullOrEmpty(search))
            {
                tanilar = tanilar.Where(s => s.Tani_kodu.Contains(search) || s.Tani_adi.Contains(search));
                var paginatedTanilarSearched = tanilar.ToList();
                return View(paginatedTanilarSearched);
            }

            var paginatedTanilar = tanilar.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            if (isFavorites == true)
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (int.TryParse(userIdString, out int userId))
                {
                    var favoriler = _context.Favori.Where(f => f.Kullanici_kodu == userId).Select(f => f.Tani_ID).ToList();
                    paginatedTanilar = paginatedTanilar.Where(t => favoriler.Contains(t.ID) && (String.IsNullOrEmpty(search) || t.Tani_adi.ToLower().Contains(search.ToLower()) || t.Tani_kodu.Contains(search))).ToList();
                }
            }

            return View(paginatedTanilar);
        }

        [HttpPost]
        public IActionResult AddToFavorites(int id)
        {
            var tani = _context.Tani.Find(id);
            if (tani != null)
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var existingfav = _context.Favori.FirstOrDefault(f => f.Tani_ID == id && f.Kullanici_kodu == int.Parse(userIdString ?? ""));
                if (existingfav != null)
                {
                    return Ok("Already added to favorites");
                }
                if (int.TryParse(userIdString, out int userId))
                {
                    var favori = new Favori
                    {
                        Tani_ID = tani.ID,
                        Kullanici_kodu = userId
                    };
                    _context.Favori.Add(favori);
                    _context.SaveChanges();
                    return Ok("Added to favorites");// Geriye başarılı olduğunu belirten bir yanıt dön
                }
            }
            throw new Exception("Did not Added to favorites");
        }

        [HttpPost]
        public IActionResult RemoveFromFavorites(int id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userIdString, out int userId))
            {
                var favori = _context.Favori.FirstOrDefault(f => f.Tani_ID == id && f.Kullanici_kodu == userId);
                if (favori != null)
                {
                    _context.Favori.Remove(favori);
                    _context.SaveChanges();
                    return Ok("Removed from favorites"); // Geriye başarılı olduğunu belirten bir yanıt dön
                }
            }
            throw new Exception("Did not Removed from favorites"); // Geriye başarısız olduğunu belirten bir yanıt dön
        }

        public IActionResult IsFavorite(int id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Response response = new Response();
            if (int.TryParse(userIdString, out int userId))
            {
                var favori = _context.Favori.FirstOrDefault(f => f.Tani_ID == id && f.Kullanici_kodu == userId);
                if (favori != null)
                {
                    response.IsFavorite = true;
                    return Ok(response);
                }
            }
            response.IsFavorite = false;
            return Ok(response);
        }
    }
}
