using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Game.CallCheat.Models
{
	public class GameCheat
	{
		public GameUser CheatCaller { get; set; }
		public GameUser LastClaimUser { get; set; }
		public List<GameClaim> PreCheatClaims { get; set; }
	}
}
