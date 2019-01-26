using System.Collections.Generic;

namespace TaccomStrike.Game.CallCheat
{
	public class GameState
	{
		public GameUser UserTurn { get; set; }

		public List<GameUser> Players { get; set; }

		public GameUser User { get; set; }

		public List<GameClaim> Claims { get; set; }

		public string LowerBoundRank { get; set; }
		public string UpperBoundRank { get; set; }
		public string MiddleBoundRank { get; set; }

		public GameState()
		{
			Players = new List<GameUser>();
			Claims = new List<GameClaim>();
		}
	}
}
