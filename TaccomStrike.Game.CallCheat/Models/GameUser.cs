using System.Collections.Generic;
using System.Security.Claims;

namespace TaccomStrike.Game.CallCheat
{
	public class GameUser
	{
		public GameUserState State { get; set; }

		public int GameUserID { get; set; }

		public ClaimsPrincipal UserPrincipal { get; set; }

		public SortedList<GameCard, GameCard> Hand { get; set; }

		public GameUser(int gameUserID, ClaimsPrincipal userPrincipal, SortedList<GameCard, GameCard> hand, GameUserState state)
		{
			State = state;
			GameUserID = gameUserID;
			UserPrincipal = userPrincipal;
			Hand = hand;
		}
	}
}