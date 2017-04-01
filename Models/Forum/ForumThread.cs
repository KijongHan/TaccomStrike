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
        [StringLength(300, ErrorMessage = "Title cannot be longer than 300 characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(1500, ErrorMessage = "Thread content cannot be longer than 1500 characters.")]
        public string Content { get; set; }

        public DateTime ForumThreadCreationTime { get; set; }
        
        public ApplicationUser ApplicationUser { get; set; }

        public int ForumTopicID { get; set; }
        public ForumTopic ForumTopic { get; set; }

        public ICollection<ForumComment> ForumComments { get; set; }

    }
}
