using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ForumThread
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ForumThreadID { get; set; }

        [Required]
        [StringLength(60, ErrorMessage = "Title cannot be longer than 300 characters.")]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime ForumThreadCreationTime { get; set; }
        
        public ApplicationUser ApplicationUser { get; set; }

        public int ForumTopicID { get; set; }
        public ForumTopic ForumTopic { get; set; }

        public ICollection<ForumComment> ForumComments { get; set; }

        public ICollection<ForumLike> ForumLikes { get; set; }

        public bool IsBanned { get; set; }

    }
}
