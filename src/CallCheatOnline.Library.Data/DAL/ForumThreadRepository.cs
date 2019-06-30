using CallCheatOnline.Library.Data.Model;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Library.Data.DAL
{
	public class ForumThreadRepository
	{
		private readonly CallCheatOnlineContext context;

		public ForumThreadRepository(CallCheatOnlineContext context)
		{
			this.context = context;
		}

		public List<GetForumThread> GetForumThreads()
		{
			var forumThreads = context.ForumThread
				.Where((item) => item.WhenDeleted == null)
				.Select((item) => new GetForumThread()
				{
					ForumThreadId = item.ForumThreadID,
					Title = item.Title,
					Content = item.Content,
					WhenCreated = item.WhenCreated,
					WhenDeleted = item.WhenDeleted,
					CallCheatOnlineUserId = item.ForumUserID,
					ForumTopicId = item.ForumTopicID
				})
				.ToList();
			return forumThreads;
		}
	}
}
