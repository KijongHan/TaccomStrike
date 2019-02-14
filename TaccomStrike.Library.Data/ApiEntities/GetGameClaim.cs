using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Game.CallCheat;
using TaccomStrike.Library.Data.Utility;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.ApiEntities
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
