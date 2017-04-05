using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models;
using AvaNet.Data;
using Microsoft.EntityFrameworkCore;

namespace AvaNet.DataAccessLayer
{
    public class ForumCommentRepository : IForumCommentRepository
    {

        private readonly ApplicationDbContext context;

        public ForumCommentRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(ForumComment item)
        {
            context.ForumComments.Add(item);
            context.SaveChanges();
        }

        public ForumComment Find(int id, bool eager)
        {
            if (eager)
            {
                ForumComment forumComment = context.ForumComments
                    .Include(t => t.ApplicationUser)
                    .Include(t => t.ForumLikes)
                    .FirstOrDefault(t => t.ForumCommentID == id);
                return forumComment;
            }

            return context.ForumComments.FirstOrDefault(t => t.ForumCommentID==id);
        }

        public IEnumerable<ForumComment> GetAll()
        {
            return context.ForumComments.ToList();
        }

        public IEnumerable<ForumComment> GetAll(bool eager)
        {
            return context.ForumComments.Include(t => t.ApplicationUser).ToList();
        }

        public void Remove(int id)
        {
            var entity = context.ForumComments.First(t => t.ForumCommentID == id);
            context.ForumComments.Remove(entity);
            context.SaveChanges();
        }

        public void Update(ForumComment item)
        {
            context.ForumComments.Update(item);
            context.SaveChanges();
        }
    }
}
