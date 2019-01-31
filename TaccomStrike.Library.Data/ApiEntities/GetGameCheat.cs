﻿using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Game.CallCheat.Models;
using TaccomStrike.Library.Data.Utility;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameCheat
	{
		public bool CheatCallSuccessful { get; set; }
		public GetGameUser CheatCaller { get; set; }
		public GetGameUser LastClaimUser { get; set; }
		public List<GetGameClaim> PreCheatClaims { get; set; }

		public GetGameCheat(GameCheat gameCheat)
		{
			CheatCallSuccessful = gameCheat.CheatCallSuccessful;
			CheatCaller = new GetGameUser(gameCheat.CheatCaller);
			LastClaimUser = new GetGameUser(gameCheat.LastClaimUser);
			PreCheatClaims = gameCheat.PreCheatClaims.ApiGetGameClaims();
		}
	}
}
