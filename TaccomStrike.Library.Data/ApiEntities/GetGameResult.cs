using System;
using System.Collections.Generic;
using TaccomStrike.Game.CallCheat.Models;
using TaccomStrike.Library.Data.Utility;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameResult
	{
		public List<GetGameUser> UsersRanking { get; set; }
		public List<int> RankingScores { get; set; }

		public GetGameResult(GameResult gameResult)
		{
			UsersRanking = gameResult.UsersRanking.ApiGetGameUsers();
			RankingScores = gameResult.RankingScores;
		}
	}
}
