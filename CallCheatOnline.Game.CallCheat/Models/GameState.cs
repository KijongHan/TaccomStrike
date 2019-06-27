using System.Collections.Generic;
using CallCheatOnline.Game.CallCheat.Models;

namespace CallCheatOnline.Game.CallCheat
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

		public GamePhase CurrentGamePhase { get;set; }
		public double TurnPhaseDuration { get; set; }
		public double CallPhaseDuration { get; set; }
		public double PreparationPhaseDuration { get; set; }

		public List<string> ActionHistory { get; set; }

		public GameState()
		{
			Players = new List<GameUser>();
			Claims = new List<GameClaim>();
		}
	}
}
