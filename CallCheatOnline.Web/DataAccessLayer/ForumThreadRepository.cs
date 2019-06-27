using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models;
using AvaNet.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaNet.DataAccessLayer
{
    public class ForumThreadRepository : IForumThreadRepository
    {
        private readonly ApplicationDbContext context;

        public ForumThreadRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(ForumThread item)
        {
            context.ForumThreads.Add(item);
            context.SaveChanges();
        }

        public ForumThread Find(int id, bool eager)
        {
            if (eager)
            {
                ForumThread forumThread = context.ForumThreads
                    .Include(t => t.ForumComments).ThenInclude(c => c.ApplicationUser)
                    .Include(t => t.ForumComments).ThenInclude(c => c.ForumLikes)
                    .Include(t => t.ForumComments).ThenInclude(c => c.ForumLikes).ThenInclude(e => e.ApplicationUser)
                    .Include(t => t.ForumTopic)
                    .Include(t => t.ForumLikes).ThenInclude(c => c.ApplicationUser)
                    .Include(t => t.ApplicationUser).ThenInclude(c => c.GameUser)
                    .FirstOrDefault(t => t.ForumThreadID == id);
                return forumThread;
            }

            return context.ForumThreads
                .Include(t => t.ApplicationUser)
                .FirstOrDefault(t => t.ForumThreadID == id);
        }

        public IEnumerable<ForumThread> GetAll()
        {
            return context.ForumThreads
                .Include(t => t.ApplicationUser).ThenInclude(c => c.GameUser)
                .ToList();
        }

        public void Remove(int id)
        {
            var entity = context.ForumThreads.First(t => t.ForumThreadID == id);
            context.ForumThreads.Remove(entity);
            context.SaveChanges();
        }

        public void Update(ForumThread item)
        {
            context.ForumThreads.Update(item);
            context.SaveChanges();
        }
    }
}
