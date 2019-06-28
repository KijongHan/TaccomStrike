using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class ForumThread
	{
		public int ForumThreadID { get; set; }
		
		public string Title { get; set; }
		
		public string Content { get; set; }
		
		public DateTime? WhenCreated { get; set; }
		
		public DateTime? WhenDeleted { get; set; }
		
		public int? ForumUserID { get; set; }
		public ForumUser ForumUser { get; set; }
		
		public int? ForumTopicID { get; set; }
		public ForumTopic ForumTopic { get; set; }

		public List<ForumComment> ForumComments { get; set; }

		public List<ForumLike> ForumLikes { get; set; }
	}
}
