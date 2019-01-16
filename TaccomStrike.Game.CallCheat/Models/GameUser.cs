using System.Collections.Generic;
using System.Security.Claims;

namespace TaccomStrike.Game.CallCheat
{
	public class GameUser
	{
		public int GameUserID { get; set; }

		public ClaimsPrincipal UserPrincipal { get; set; }

		public List<GameCard> Hand { get; set; }

		public GameUser(int gameUserID, ClaimsPrincipal userPrincipal, List<GameCard> hand)
		{
			GameUserID = gameUserID;
			UserPrincipal = userPrincipal;
			Hand = hand;
		}
	}
}