using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ForumComment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ForumCommentID { get; set; }

        [Required]
        [StringLength(1500, ErrorMessage = "Comment content cannot be longer than 1500 characters.")]
        public string Content { get; set; }

        public DateTime ForumCommentCreationTime { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<ForumLike> ForumLikes { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsBanned { get; set; }
    }
}
