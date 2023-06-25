using CatalogWithItemsData.Models;
using CatalogWithItemsWebAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatalogWithItemsWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductsDbContext _productsDbContext;

        public ProductController(ProductsDbContext productsDbContext)
        {
            _productsDbContext = productsDbContext;
        }
        [HttpGet]
        public List<CatalogWithItemsData.Models.Product> Get([FromHeader] int a, [FromQuery] int b)
        {
            var products = _productsDbContext.Products
                .Include(x => x.Category)
                .ToList();

            return products;
        }
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            var product = _productsDbContext.Products.FirstOrDefault(x => x.Id == id);

            return product!;
        }
        [HttpPost("{id}")]
        public IActionResult Post(int id, Product product)
        {
            var existProduct = _productsDbContext.Products.FirstOrDefault(x => x.Id == id);

            if (existProduct == null)
            {
                return NotFound();
            }

            existProduct.Name = product.Name;
            existProduct.Price = product.Price;
            existProduct.CategoryId = product.CategoryId;

            _productsDbContext.Products.Update(existProduct);
            _productsDbContext.SaveChanges();

            return Ok();
        }
        [HttpPut]
        public IActionResult Put(Product product)
        {

            _productsDbContext.Products.Add(product);
            _productsDbContext.SaveChanges();

            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existProduct = _productsDbContext.Products.FirstOrDefault(x => x.Id == id);

            if (existProduct == null)
            {
                return NotFound();
            }

            _productsDbContext.Products.Remove(existProduct);
            _productsDbContext.SaveChanges();

            return Ok();
        }
      }
    }
    