using library.data.Model;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;

namespace library.data.DAL
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
                    ForumThreadId = item.ForumThreadId,
                    Title = item.Title,
                    Content = item.Content,
                    WhenCreated = item.WhenCreated,
                    WhenDeleted = item.WhenDeleted,
                    TaccomStrikeUserId = item.TaccomStrikeUserId,
                    ForumTopicId = item.ForumTopicId
                })
                .ToList();
            return forumThreads;
        }
    }
}
