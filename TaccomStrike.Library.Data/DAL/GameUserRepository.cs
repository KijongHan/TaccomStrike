using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.DAL
{
	public class GameUserRepository
	{
		private readonly TaccomStrikeContext dbContext;

		public GameUserRepository(TaccomStrikeContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public int CreateGameUser()
		{
			GameUser user = new GameUser();
			user.WhenCreated = DateTime.Now;
			user.GameScore = 0;
			dbContext.GameUser.Add(user);
			dbContext.SaveChanges();
			return user.GameUserID;
		}

		public Task UpdateGameScores(List<ClaimsPrincipal> userRankings, List<int> rankingScores)
		{
			return Task.Run(() =>
			{
				using (var db = new TaccomStrikeContext())
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
