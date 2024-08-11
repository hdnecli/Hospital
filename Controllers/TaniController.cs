using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Models;

namespace TaniProjesi.Controllers
{
    [Authorize]
    public class TaniController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}