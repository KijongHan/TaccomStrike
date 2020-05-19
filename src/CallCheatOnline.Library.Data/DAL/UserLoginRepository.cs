using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Data.ViewModel;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using CallCheatOnline.Library.Utility.Security;
using CallCheatOnline.Library.Data.Model.Views;

namespace CallCheatOnline.Library.Data.DAL 
{
	public class UserLoginRepository 
	{
		private CallCheatOnlineContext dbContext;

		private readonly ForumUserRepository forumUserRepository;
		private readonly GameUserRepository gameUserRepository;

		public UserLoginRepository(CallCheatOnlineContext dbContext, ForumUserRepository forumUserRepository, GameUserRepository gameUserRepository) 
		{
			this.dbContext = dbContext;
			this.forumUserRepository = forumUserRepository;
			this.gameUserRepository = gameUserRepository;
		}

		public int CreateUserLogin(CreateUserLogin user, string passwordSalt, string passwordHash, int forumUserID, int gameUserID)
		{
			UserLogin insertUser = new UserLogin()
			{
				Username = user.Username,
				Email = user.Email,
				PasswordSalt = passwordSalt,
				PasswordHash = passwordHash,
				ForumUserID = forumUserID,
				GameUserID = gameUserID
			};
			insertUser.WhenCreated = DateTime.UtcNow;
			dbContext.UserLogin.Add(insertUser);
			dbContext.SaveChanges();
			return insertUser.UserLoginID;
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

		public Task<List<UserLogin>> GetUserLoginsAsync(string email = null, string username = null)
		{
			return Task.Run(() =>
			{
				var query = dbContext.UserLogin.AsQueryable();
				if(email!=null)
				{
					query = query.Where((i) => i.Email == email);
				}
				if(username!=null)
				{
					query = query.Where((i) => i.Username == username);
				}
				return query.ToList();
			});
		}

		public Task<UserLogin> CreateUserLoginAsync(CreateUserLogin userEntity)
		{
			return Task.Run(() => {
				if (GetUserLogin(userEntity.Username) != null)
				{
					return null;
				}
				if (GetUserLoginByEmail(userEntity.Email) != null)
				{
					return null;
				}

				string passwordSalt = Authentication.GenerateSalt();
				string hashPassword = Authentication.HashPassword(userEntity.Password, passwordSalt);

				var forumUserID = forumUserRepository.CreateForumUser();
				var gameUserID = gameUserRepository.CreateGameUser();
				var userLoginID = CreateUserLogin(userEntity, passwordSalt, hashPassword, forumUserID, gameUserID);

				return GetUserLogin(userLoginID);
			});
		}

		public Task<List<UserComplete>> GetLeaderboard(int top)
		{
			return Task.Run(() =>
			{
				var query = dbContext.UserComplete.AsQueryable();
				query = query
					.OrderByDescending((i) => i.GameScore)
					.Take(top);
				return query.ToList();
			});
		}
	}
}