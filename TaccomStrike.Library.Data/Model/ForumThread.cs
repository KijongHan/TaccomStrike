using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{
	[Table("ForumThread", Schema="forum")]
	public class ForumThread
	{
		[Key, Column("ForumThreadID")]
		public int ForumThreadID { get; set; }
		
		[Column("Title")]
		public string Title { get; set; }
		
		[Column("Content")]
		public string Content { get; set; }
		
		[Column("WhenCreated")]
		public DateTime? WhenCreated { get; set; }
		
		[Column("WhenDeleted")]
		public DateTime? WhenDeleted { get; set; }
		
		[Column("ForumUserID")]
		public int? ForumUserID { get; set; }
		
		[Column("ForumTopicID")]
		public int? ForumTopicID { get; set; }
		
	}
}
