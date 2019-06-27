using System;
using System.Collections.Generic;
using CallCheatOnline.Game.CallCheat.Models;
using CallCheatOnline.Library.Data.Utility;

namespace CallCheatOnline.Library.Data.ApiEntities
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
