﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogWithItemsData.Models
{
    public class Product : IItem
    {
        [Key]

        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        [ForeignKey(nameof(Category))]

        public int CategoryId { get; set; }

        public Category? Category { get; set; }

    }
}
