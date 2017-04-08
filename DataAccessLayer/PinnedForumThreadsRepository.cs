using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models.ViewModels.ForumViewModels;
using AvaNet.Data;
using AvaNet.Models;
using Microsoft.EntityFrameworkCore;

namespace AvaNet.DataAccessLayer
{
    public class PinnedForumThreadsRepository : IPinnedForumThreadsRepository
    {
        private readonly ApplicationDbContext context;

        public PinnedForumThreadsRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(PinnedForumThreads pinnedForumThreads)
        {
            context.PinnedForumThreads.Add(pinnedForumThreads);
            context.SaveChanges();
        }

        public PinnedForumThreads Find()
        {
            return context.PinnedForumThreads
                .Include(t => t.ForumThreads)
                .FirstOrDefault();
        }

        public void Update(PinnedForumThreads pinnedForumThreads)
        {
            context.PinnedForumThreads.Update(pinnedForumThreads);
            context.SaveChanges();
        }
    }
}
