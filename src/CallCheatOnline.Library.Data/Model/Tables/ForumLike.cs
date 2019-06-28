using System;

namespace CallCheatOnline.Library.Data.Model
{
	public class ForumLike
	{
		public int ForumLikeID { get; set; }
		
		public int LikeWeight { get; set; }

		public int? ForumCommentID { get; set; }
		public ForumComment ForumComment { get; set; }
		
		public DateTime? WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }
		
		public int? ForumThreadID { get; set; }
		public ForumThread ForumThread { get; set; }
		
		public int? ForumUserID { get; set; }
		public ForumUser ForumUser { get; set; }
	}
}
