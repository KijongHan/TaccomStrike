using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class ForumTopic
	{
		public int ForumTopicID { get; set; }
		
		public string Title { get; set; }
		
		public string Description { get; set; }
		
		public DateTime? WhenCreated { get; set; }
		
		public DateTime? WhenDeleted { get; set; }

		public List<ForumThread> ForumThreads { get; set; }
	}
}
