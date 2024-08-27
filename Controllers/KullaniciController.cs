using Microsoft.AspNetCore.Mvc;
using HastaneNamespace.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace TaniProjesi.Controllers;

public class KullaniciController : Controller
{
    private readonly ApplicationDbContext _context;

    public KullaniciController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Login()
    {
        ViewData["Title"] = "Giriş Ekranı";
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(string kullanici_adi, string sifre)
    {
        var kullanici = _context.Kullanici.FirstOrDefault(k => k.Kullanici_adi == kullanici_adi && k.Sifre == sifre);
        if (kullanici != null)
        {
            // Giriş başarılı, Tanı Girişi ekranına yönlendir.
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, kullanici.Kullanici_adi),
                new Claim(ClaimTypes.NameIdentifier, kullanici.ID.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            
            ViewData["Title"] = "Hasta İşlemleri";
            return RedirectToAction("Index", "HastaIslemleri");
        }

        // Hatalı giriş
        ViewBag.Message = "Kullanıcı adı veya şifre hatalı.";
        return View();
    }
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login");
    }
}

