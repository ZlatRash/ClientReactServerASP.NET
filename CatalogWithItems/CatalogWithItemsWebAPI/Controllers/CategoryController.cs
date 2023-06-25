using CatalogWithItemsData.Models;
using CatalogWithItemsWebAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CatalogWithItemsWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController  : ControllerBase    
    {
        private readonly ProductsDbContext _productsDbContext;

        public CategoryController(ProductsDbContext productsDbContext) 
        {
            _productsDbContext = productsDbContext;
        }
        /*   [HttpGet]
             public List<Category> Get([FromHeader] int a, [FromQuery] int b)
             {
                 var categories = _productsDbContext.Categories.ToList();

                 return categories;
             }*/
        [HttpGet]
        public List<CatalogWithItemsData.Models.Category> Get()
        {
            var categories = _productsDbContext.Categories.ToList();

            return categories;
        }
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            var category = _productsDbContext.Categories.FirstOrDefault(x => x.Id == id);

            return category!;
        }
        [HttpPost("{id}")]
        public IActionResult Post(int id, Category category)
        {
            var existCategory = _productsDbContext.Categories.FirstOrDefault(x => x.Id == id);

            if (existCategory == null)
            {
                return NotFound();
            }

            existCategory.Name = category.Name;
            existCategory.Type = category.Type;

            _productsDbContext.Categories.Update(existCategory);
            _productsDbContext.SaveChanges();

            return Ok();
        }
        [HttpPut]
        public IActionResult Put(Category category)
        {
            _productsDbContext.Categories.Add(category);
            _productsDbContext.SaveChanges();
            Console.WriteLine(category);
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existCategory = _productsDbContext.Categories.FirstOrDefault(x => x.Id == id);

            if (existCategory == null)
            {
                return NotFound();
            }

            _productsDbContext.Categories.Remove(existCategory);
            _productsDbContext.SaveChanges();

            return Ok();
        }
    }
}
