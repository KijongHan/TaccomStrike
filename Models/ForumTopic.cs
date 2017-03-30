using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ForumTopic
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ForumTopicID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<ForumThread> ForumThreads { get; set; }

    }
}
