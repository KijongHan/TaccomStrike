using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.ViewModel
{
    public class GetForumThread
    {
        public int ForumThreadId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? WhenCreated { get; set; }
        public DateTime? WhenDeleted { get; set; }
        public int? CallCheatOnlineUserId { get; set; }
        public int? ForumTopicId { get; set; }
    }
}
