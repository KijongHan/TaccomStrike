using TaccomStrike.Library.Data.Model;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.DAL
{
	public class ForumThreadRepository
	{
		private readonly TaccomStrikeContext context;

		public ForumThreadRepository(TaccomStrikeContext context)
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
					TaccomStrikeUserId = item.ForumUserID,
					ForumTopicId = item.ForumTopicID
				})
				.ToList();
			return forumThreads;
		}
	}
}
