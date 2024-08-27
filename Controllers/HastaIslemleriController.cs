using System.Diagnostics;
using HastaneNamespace.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaniProjesi.Models;

namespace TaniProjesi.Controllers;

[Authorize]
public class HastaIslemleriController : Controller {

    private readonly ApplicationDbContext _context;
    public HastaIslemleriController(ApplicationDbContext context){
        _context = context;
    }

    public IActionResult Index (string search ){
        
        return View();
    }
}