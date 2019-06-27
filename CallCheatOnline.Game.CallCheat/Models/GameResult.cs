using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Game.CallCheat.Models
{
	public class GameResult
	{
		public List<GameUser> UsersRanking { get; set; }
		public List<int> RankingScores { get; set; }
	}
}
