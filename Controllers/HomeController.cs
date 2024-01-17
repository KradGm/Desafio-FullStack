using Microsoft.AspNetCore.Mvc;

namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}