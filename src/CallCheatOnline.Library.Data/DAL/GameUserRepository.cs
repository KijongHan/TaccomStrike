using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Library.Data.DAL
{
	public class GameUserRepository
	{
		private readonly CallCheatOnlineContext dbContext;

		public GameUserRepository(CallCheatOnlineContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public int CreateGameUser()
		{
			GameUser user = new GameUser();
			user.WhenCreated = DateTime.UtcNow;
			user.GameScore = 0;
			dbContext.GameUser.Add(user);
			dbContext.SaveChanges();
			return user.GameUserID;
		}

		public Task UpdateGameScores(List<ClaimsPrincipal> userRankings, List<int> rankingScores)
		{
			return Task.Run(() =>
			{
				using (var db = new CallCheatOnlineContext())
				{
					for (int i = 0; i < userRankings.Count; i++)
					{
						var gameUserID = db
							.UserLogin
							.Where((v) => v.UserLoginID == userRankings.ElementAt(i).GetUserLoginID())
							.First()
							.GameUserID;
						var gameUser = db
							.GameUser
							.Where((v) => v.GameUserID == gameUserID)
							.FirstOrDefault();
						gameUser.GameScore = gameUser.GameScore + rankingScores.ElementAt(i);
						db.SaveChanges();
					}
				}
			});
		}
	}
}
