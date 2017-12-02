using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.DAL
{
    public class ForumUserRepository
    {
        private readonly TaccomStrikeContext dbContext;

        public ForumUserRepository(TaccomStrikeContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public int CreateForumUser()
        {
            ForumUser user = new ForumUser();
            user.WhenCreated = DateTime.Now;
            dbContext.ForumUser.Add(user);
            dbContext.SaveChanges();
            return user.ForumUserID;
        }

        public Task<int> CreateForumUserAsync()
        {
            return Task.Run(() => 
            {
                ForumUser user = new ForumUser();
                user.WhenCreated = DateTime.Now;
                dbContext.ForumUser.Add(user);
                dbContext.SaveChanges();
                return user.ForumUserID;
            });
        }
    }
}
