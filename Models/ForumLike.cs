using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ForumLike
    {
        public enum LikeWeight
        {
            Like, Dislike, Neutral
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ForumLikeID { get; set; }

        public int Weight { get; set; }
        
        public ApplicationUser ApplicationUser { get; set; }
    }
}
