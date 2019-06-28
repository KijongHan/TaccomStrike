using System;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Game.CallCheat;
using CallCheatOnline.Library.Data.Utility;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Library.Data.ApiEntities
{
	public class GetGameClaim
	{
		public List<GetGameCard> Claims { get; set; }

		public List<GetGameCard> Actual { get; set; }

		public GetGameUser ClaimUser { get; set; }

		public GetGameClaim() {}

		public GetGameClaim(GameClaim gameClaim)
		{
			Claims = gameClaim.Claims.ApiGetGameCard();
			Actual = gameClaim.Actual.ApiGetGameCard();
			ClaimUser = new GetGameUser(gameClaim.ClaimUser);
		}
	}
}
