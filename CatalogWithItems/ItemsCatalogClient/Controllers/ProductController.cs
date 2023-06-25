using CatalogWithItemsData.Models;
using ItemsCatalogClient.Models;
using ItemsCatalogClient.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;

namespace ItemsCatalogClient.Controllers
{
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly CatalogService _catalogService;


        public ProductController(ILogger<ProductController> logger,CatalogService catalogService)
        {
            _logger = logger;
            _catalogService = catalogService;
        }
        public async Task<IActionResult> Remove(int id)
        {
            await _catalogService.RenoveProducts(id);
            return RedirectToAction("Index");
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Product product)
        {
            bool result = await _catalogService.EditProduct(product);
            if (result)
            {
                return RedirectToAction("Index");
            }
            return View((product, await GetCategoriesSelectList()));
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _catalogService.GetProductById(id);
            var categories = await GetCategoriesSelectList();

            return View((product,categories));
        }
        [HttpPost]
        public async Task<IActionResult> Add(Product product)
        {
            bool result = await _catalogService.AddProduct(product);
            if (result)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Add()
        {

            return View(await GetCategoriesSelectList());
        }
        public async Task<IActionResult> Index()
        {
            List<Product> products = await _catalogService.GetProducts();

            return View(products);
        }
        private async Task<SelectList> GetCategoriesSelectList()
        {
            List<Category> categories = await _catalogService.GetCategories();

            return new SelectList(categories, "Id" , "Name");
        }
    }



    /* public IActionResult Index()
     {
         return View();
     }

     public IActionResult Privacy()
     {
         return View();
     }

     [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
     public IActionResult Error()
     {
         return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
     }*/
}
