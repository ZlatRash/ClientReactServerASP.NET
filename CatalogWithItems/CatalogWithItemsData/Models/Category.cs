using System.ComponentModel.DataAnnotations;
using CatalogWithItemsData.Types;

namespace CatalogWithItemsData.Models
{
    public class Category : IItem
    {
        [Key]

        public int Id { get; set; }

        public string Name { get; set; }

        public CategoryType Type { get; set; }
    }
}
