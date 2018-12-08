using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.Utility;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameState
	{
		public GetGameUser UserTurn { get; set; }

		public List<GetGameCard> Hand { get; set; }

		public List<GetGameUser> Players { get; set; }

		public List<GetGameClaim> Claims { get; set; }

		public GetGameState()
		{
			Hand = new List<GetGameCard>();
			Players = new List<GetGameUser>();
			Claims = new List<GetGameClaim>();
		}

		public GetGameState(GameState gameState)
		{
			UserTurn = new GetGameUser(gameState.UserTurn);
			Hand = gameState.User.Hand.ApiGetGameCard();
			Players = gameState.Players.ApiGetGameUsers();
			Claims = gameState.Claims.ApiGetGameClaims();
		}
	}
}
