using System.Collections.Generic;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GameState
	{
		public GameUser UserTurn { get; set; }

		public List<GameUser> Players { get; set; }

		public GameUser User { get; set; }

		public List<GameClaim> Claims { get; set; }

		public GameState()
		{
			Players = new List<GameUser>();
			Claims = new List<GameClaim>();
		}
	}
}
