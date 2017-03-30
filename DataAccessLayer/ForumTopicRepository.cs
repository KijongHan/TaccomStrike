using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models;
using AvaNet.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaNet.DataAccessLayer
{
    public class ForumTopicRepository : IForumTopicRepository
    {
        private readonly ApplicationDbContext context;

        public ForumTopicRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(ForumTopic item)
        {
            context.ForumTopics.Add(item);
            context.SaveChanges();
        }

        public ForumTopic Find(int id, bool eager)
        {
            if (eager)
            {
                return context.ForumTopics.Include(t => t.ForumThreads).FirstOrDefault(e => e.ForumTopicID == id);
            }

            return context.ForumTopics.FirstOrDefault(e => e.ForumTopicID == id);
        }

        public ForumTopic Find(string title)
        {
            return context.ForumTopics.FirstOrDefault(t => t.Title == title);
        }

        public IEnumerable<ForumTopic> GetAll()
        {
            return context.ForumTopics.ToList();
        }

        public void Remove(int id)
        {
            var entity = context.ForumTopics.First(t => t.ForumTopicID == id);
            context.ForumTopics.Remove(entity);
            context.SaveChanges();
        }

        public void Update(ForumTopic item)
        {
            context.ForumTopics.Update(item);
            context.SaveChanges();
        }
    }
}
