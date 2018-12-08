using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{
	[Table("ForumLike", Schema="forum")]
	public class ForumLike
	{
		[Key, Column("ForumLikeID")]
		public int ForumLikeID { get; set; }

		[Column("LikeWeight")]
		public int LikeWeight { get; set; }

		[Column("ForumCommentID")]
		public int? ForumCommentID { get; set; }
		
		[Column("WhenCreated")]
		public DateTime? WhenCreated { get; set; }

		[Column("WhenDeleted")]
		public DateTime? WhenDeleted { get; set; }

		[Column("ForumThreadID")]
		public int? ForumThreadID { get; set; }
		
		[Column("ForumUserID")]
		public int? ForumUserID { get; set; }

	}
}
