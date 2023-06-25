using CatalogWithItemsData.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogWithItemsWebAPI.Data
{
    public class ProductsDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }    

        public DbSet<User> Users { get; set; }

        public ProductsDbContext(DbContextOptions<ProductsDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User[]
                {
                new User { Id=1, Username="Tom", Password="tom123"},
                new User { Id=2, Username="Alice", Password="alice123"},
                new User { Id=3, Username="Sam", Password="sam123"}
                });
        }
    }
}
