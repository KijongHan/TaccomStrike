using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Game.CallCheat.Models
{
	public class GameCheat
	{
		public bool CheatCallSuccessful { get; set; }
		public GameUser CheatCaller { get; set; }
		public GameUser LastClaimUser { get; set; }
		public List<GameClaim> PreCheatClaims { get; set; }
	}
}
