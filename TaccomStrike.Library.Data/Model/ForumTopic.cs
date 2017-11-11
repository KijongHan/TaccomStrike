using System;
using System.Collections.Generic;

namespace library.data.Model
{
    public partial class ForumTopic
    {
        public ForumTopic()
        {
            ForumThread = new HashSet<ForumThread>();
        }

        public int ForumTopicId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }

        public ICollection<ForumThread> ForumThread { get; set; }
    }
}
