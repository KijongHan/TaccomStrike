using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Library.Data.ViewModel
{
    public class GetForumThread
    {
        public int ForumThreadId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }
        public int? TaccomStrikeUserId { get; set; }
        public int? ForumTopicId { get; set; }
    }
}
