using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{
	[Table("ForumComment", Schema="forum")]
	public class ForumComment
	{
		[Key, Column("ForumCommentID")]
		public int ForumCommentID { get; set; }

		[Column("CommentContent")]
		public string CommentContent { get; set; }

		[Column("WhenCreated")]
		public DateTime WhenCreated { get; set; }

		[Column("WhenDeleted")]
		public DateTime? WhenDeleted { get; set; }
		
		[Column("ForumThreadID")]
		public int? ForumThreadID { get; set; }

		[Column("ForumUserID")]
		public int? ForumUserID { get; set; }
	}
}
