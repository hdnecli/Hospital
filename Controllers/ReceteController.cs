using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Data;
using TaniProjesi.Models;
using System.Security.Claims;

namespace TaniProjesi.Controllers;

[Authorize]
public class ReceteController : Controller{
    private readonly ApplicationDbContext _context;

    public ReceteController(ApplicationDbContext context){
        _context = context;
    }

    public IActionResult Index(int HastaId){
        return View();
    }
}