using System.Collections.Generic;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GameClaim
	{
		public List<GameCard> Claims { get; set; }

		public List<GameCard> Actual { get; set; }

		public GameUser ClaimUser { get; set; }

		public GameClaim(List<GameCard> claims, List<GameCard> actual, GameUser user)
		{
			Claims = claims;
			Actual = actual;
			ClaimUser = user;
		}
	}
}