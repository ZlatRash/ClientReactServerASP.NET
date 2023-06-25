using Microsoft.AspNetCore.Mvc;

namespace CatalogWithItemsWebAPI
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
