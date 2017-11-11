using System;
using System.Collections.Generic;

namespace library.data.Model
{
    public partial class TaccomStrikeUser
    {
        public TaccomStrikeUser()
        {
            ForumComment = new HashSet<ForumComment>();
            ForumLike = new HashSet<ForumLike>();
            ForumThread = new HashSet<ForumThread>();
        }

        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }
        public int TaccomStrikeUserId { get; set; }

        public ICollection<ForumComment> ForumComment { get; set; }
        public ICollection<ForumLike> ForumLike { get; set; }
        public ICollection<ForumThread> ForumThread { get; set; }
    }
}
