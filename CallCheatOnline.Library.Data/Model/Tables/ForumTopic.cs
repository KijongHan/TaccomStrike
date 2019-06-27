using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CallCheatOnline.Library.Data.Model
{
	[Table("ForumTopic", Schema="forum")]
	public class ForumTopic
	{
		[Key, Column("ForumTopicID")]
		public int ForumTopicID { get; set; }
		
		[Column("Title")]
		public string Title { get; set; }
		
		[Column("Description")]
		public string Description { get; set; }
		
		[Column("WhenCreated")]
		public DateTime? WhenCreated { get; set; }

		[Column("WhenDeleted")]
		public DateTime? WhenDeleted { get; set; }
	}
}
