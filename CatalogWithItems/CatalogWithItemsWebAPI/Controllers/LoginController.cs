using CatalogWithItemsData.Models;
using CatalogWithItemsWebAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CatalogWithItemsWebAPI.Controllers
{

    [ApiController]
    [Route("[action]")]
    public class LoginController : ControllerBase
    {
        private readonly ProductsDbContext _context;

        public LoginController(ProductsDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user = _context.Users.FirstOrDefault(user => user.Username == loginModel.Login && user.Password == loginModel.Password);

            if (user == null)
            {
                return new JsonResult(new { status = 1, token = "" });
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModel.Login),
            };

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2000)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return new JsonResult(new {status = 0,token});
        }
       
       

        public class AuthOptions
        {
            public const string ISSUER = "MyAuthServer"; // издатель токена
            public const string AUDIENCE = "MyAuthClient"; // потребитель токена
            const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
            public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}
