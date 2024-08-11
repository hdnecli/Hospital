using Microsoft.AspNetCore.Mvc;
using HastaneNamespace.Data;
using System.Linq;

namespace TaniProjesi.Controllers
{
    public class KullaniciController : Controller
    {
        private readonly ApplicationDbContext _context;

        public KullaniciController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string kullanici_adi, string sifre)
        {
            var kullanici = _context.Kullanicilar.FirstOrDefault(k => k.Kullanici_adi == kullanici_adi && k.Sifre == sifre);
            if (kullanici != null)
            {
                // Giriş başarılı, Tanı Girişi ekranına yönlendir.
                return RedirectToAction("Index", "Tani");
            }

            // Hatalı giriş
            ViewBag.Message = "Kullanıcı adı veya şifre hatalı.";
            return View();
        }
    }
}
