using System.Collections.Generic;
using System.Security.Claims;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GameUser
	{
		public ClaimsPrincipal UserPrincipal { get; set; }

		public List<GameCard> Hand { get; set; }

		public GameUser(ClaimsPrincipal userPrincipal, List<GameCard> hand)
		{
			UserPrincipal = userPrincipal;
			Hand = hand;
		}
	}
}