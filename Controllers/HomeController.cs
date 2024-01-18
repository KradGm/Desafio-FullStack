using Microsoft.AspNetCore.Mvc;

namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;
/// <summary>
/// Esse é o controlador padrão do MVC.
/// </summary>
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}