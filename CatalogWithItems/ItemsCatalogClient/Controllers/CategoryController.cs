using CatalogWithItemsData.Models;
using ItemsCatalogClient.Models.Config;
using ItemsCatalogClient.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net;

namespace ItemsCatalogClient.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly CatalogService _catalogService;


        public CategoryController(ILogger<CategoryController> logger, IOptions<CatalogWithItemsWebAPIConfig> cwiWebAPIConfig, CatalogService catalogService)
        {
            _logger = logger;
            _catalogService = catalogService;
        }
        public async Task<IActionResult> Remove(int id)
        {
            await _catalogService.RemoveCategories(id);
            return RedirectToAction("Index");
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Category category)
        {
            bool result = await _catalogService.EditCategory(category);
            if (result)
            {
                return RedirectToAction("Index");
            }
            return View(category);
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var category = await _catalogService.GetCategoryById(id);
            return View(category);
        }
        [HttpPost]
        public async Task<IActionResult> Add(Category category)
        {
            bool result = await _catalogService.AddCategories(category);
            if (result)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Add()
        {
            return View();
        }
        public async Task<IActionResult> Index()
        {
            List<Category> categories = await _catalogService.GetCategories();

            return View(categories);
        }
    }
}