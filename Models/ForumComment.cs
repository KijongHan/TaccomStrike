using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ForumComment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ForumCommentID { get; set; }

        public string Content { get; set; }
        
        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<ForumLike> ForumLikes { get; set; }
    }
}
