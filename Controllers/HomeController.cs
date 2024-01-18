using Microsoft.AspNetCore.Mvc;

namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;
/// <summary>
/// This is the main controller for handling home-related actions.
/// </summary>
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}