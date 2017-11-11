using System;
using System.Collections.Generic;

namespace library.data.Model
{
    public partial class ForumLike
    {
        public int ForumlikeId { get; set; }
        public int LikeWeight { get; set; }
        public int? ForumCommentId { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }
        public int? ForumThreadId { get; set; }
        public int? TaccomStrikeUserId { get; set; }

        public ForumComment ForumComment { get; set; }
        public ForumThread ForumThread { get; set; }
        public TaccomStrikeUser TaccomStrikeUser { get; set; }
    }
}
