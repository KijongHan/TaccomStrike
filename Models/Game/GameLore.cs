using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class GameLore
    {
        public int GameLoreID { get; set; }

        [Required]
        public string ImageURL { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
