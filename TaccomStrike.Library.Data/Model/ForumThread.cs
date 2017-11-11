using System;
using System.Collections.Generic;

namespace library.data.Model
{
    public partial class ForumThread
    {
        public ForumThread()
        {
            ForumComment = new HashSet<ForumComment>();
            ForumLike = new HashSet<ForumLike>();
        }

        public int ForumThreadId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }
        public int? TaccomStrikeUserId { get; set; }
        public int? ForumTopicId { get; set; }

        public ForumTopic ForumTopic { get; set; }
        public TaccomStrikeUser TaccomStrikeUser { get; set; }
        public ICollection<ForumComment> ForumComment { get; set; }
        public ICollection<ForumLike> ForumLike { get; set; }
    }
}
