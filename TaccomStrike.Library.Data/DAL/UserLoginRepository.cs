using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Data.ViewModel;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace TaccomStrike.Library.Data.DAL 
{
	public class UserLoginRepository 
	{
		private TaccomStrikeContext dbContext;

		public UserLoginRepository(TaccomStrikeContext dbContext) 
		{
			this.dbContext = dbContext;
		}

		public int CreateUserLogin(CreateUserLogin user, string passwordSalt, string passwordHash, int forumUserID)
		{
			UserLogin insertUser = new UserLogin()
			{
				Username = user.Username,
				Email = user.Email,
				PasswordSalt = passwordSalt,
				PasswordHash = passwordHash,
				ForumUserID = forumUserID
			};
			insertUser.WhenCreated = DateTime.Now;
			dbContext.UserLogin.Add(insertUser);
			dbContext.SaveChanges();
			return insertUser.ForumUserID;
		}

		public UserLogin GetUserLoginByEmail(string email)
		{
			var user = dbContext.UserLogin
				.Where((item) => item.Email == email)
				.FirstOrDefault();
			return user;
		}

		public UserLogin GetUserLogin(string username)
		{
			var user = dbContext.UserLogin
				.Where((item) => item.Username == username)
				.FirstOrDefault();
			return user;
		}

		public Task<UserLogin> GetUserLoginAsync(string username)
		{
			return Task.Run(() => 
			{
				return GetUserLogin(username);
			});
		}

		public UserLogin GetUserLogin(int id)
		{
			var user = dbContext.UserLogin
			.Where((item) => item.UserLoginID == id)
			.FirstOrDefault();
			return user;
		}

		public Task<int> CreateUserLoginAsync(CreateUserLogin user, string passwordSalt, string passwordHash, int forumUserID)
		{
			return Task.Run(() => 
			{
				UserLogin insertUser = new UserLogin()
				{
					Username = user.Username,
					PasswordSalt = passwordSalt,
					PasswordHash = passwordHash,
					ForumUserID = forumUserID
				};
				insertUser.WhenCreated = DateTime.Now;
				dbContext.UserLogin.Add(insertUser);
				dbContext.SaveChanges();
				return insertUser.ForumUserID;
			});   
		}
	}
}