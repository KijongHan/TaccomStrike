using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Data.Model;

namespace CallCheatOnline.Library.Data.DAL
{
	public class ForumUserRepository
	{
		private readonly CallCheatOnlineContext dbContext;

		public ForumUserRepository(CallCheatOnlineContext dbContext)
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
