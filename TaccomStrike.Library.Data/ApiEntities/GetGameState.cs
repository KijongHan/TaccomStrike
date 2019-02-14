using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Game.CallCheat;
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

		public string LowerBoundRank { get; set; }
		public string UpperBoundRank { get; set; }
		public string MiddleBoundRank { get; set; }

		public int CurrentGamePhase { get; set; }
		public double TurnPhaseDuration { get; set; }
		public double CallPhaseDuration { get; set; }

		public List<string> ActionHistory { get; set; }

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

			LowerBoundRank = gameState.LowerBoundRank;
			UpperBoundRank = gameState.UpperBoundRank;
			MiddleBoundRank = gameState.MiddleBoundRank;

			CurrentGamePhase = (int)gameState.CurrentGamePhase;
			TurnPhaseDuration = gameState.TurnPhaseDuration;
			CallPhaseDuration = gameState.CallPhaseDuration;

			ActionHistory = gameState.ActionHistory;
		}
	}
}
