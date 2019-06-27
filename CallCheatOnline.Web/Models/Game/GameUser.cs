using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class GameUser
    {
        
        [StringLength(25, ErrorMessage = "Game User tag cannot be longer than 30 characters")]
        public string GameUserID { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
        
    }
}
