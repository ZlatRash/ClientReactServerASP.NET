using CatalogWithItemsWebAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatalogWithItemsWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ProductsDbContext _context;

        public UserController(ProductsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<string> GetUsers()
        {
            var usernames = _context.Users.Select(user => user.Username).ToList();

            return usernames;
        }
    }
}
