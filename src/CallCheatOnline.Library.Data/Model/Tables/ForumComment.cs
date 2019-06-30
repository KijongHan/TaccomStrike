using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class ForumComment
	{
		public int ForumCommentID { get; set; }

		public string CommentContent { get; set; }

		public DateTime WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }
		
		public int? ForumThreadID { get; set; }
		public ForumThread ForumThread { get; set; }
		
		public int? ForumUserID { get; set; }
		public ForumUser ForumUser { get; set; }

		public List<ForumLike> ForumLikes { get; set; }
	}
}
