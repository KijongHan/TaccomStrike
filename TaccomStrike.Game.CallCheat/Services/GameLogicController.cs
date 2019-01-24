using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Game.CallCheat.Services
{
	public class GameLogicController
	{
		private int turnsIndex;

		public List<GameUser> GameUsers { get; set; }
		public List<GameClaim> CurrentClaims { get; set; }

		public GameState GetGameState(ClaimsPrincipal user)
		{
			GameState gameState = new GameState();
			gameState.UserTurn = GetCurrentPlayerTurn();
			gameState.User = GetPlayer(user);
			gameState.Claims = CurrentClaims;
			gameState.Players = GameUsers;

			return gameState;
		}

		public bool CallCheat(ClaimsPrincipal user)
		{
			var gameUser = GetPlayer(user);

			var lastClaim = CurrentClaims.Last();
			for (int i = 0; i < lastClaim.Claims.Count; i++)
			{
				if (lastClaim.Claims[i].Rank != lastClaim.Actual[i].Rank)
				{
					var lastClaimUser = lastClaim.ClaimUser;

					foreach (var claim in CurrentClaims)
					{
						foreach (var actualCard in claim.Actual)
						{
							lastClaimUser.Hand.Add(actualCard);
						}
					}

					CurrentClaims = new List<GameClaim>();
					return true;
				}
			}

			foreach (var claim in CurrentClaims)
			{
				foreach (var actualCard in claim.Actual)
				{
					gameUser.Hand.Add(actualCard);
				}
			}
			CurrentClaims = new List<GameClaim>();
			return true;
		}

		public bool SubmitClaim(ClaimsPrincipal user, List<GameCard> claims, List<GameCard> actual)
		{
			if (claims.Count != actual.Count)
			{
				return false;
			}

			var referenceCard = claims[0];
			foreach (var card in claims)
			{
				if (card.Rank != referenceCard.Rank)
				{
					return false;
				}
			}

			if (CurrentClaims.Count > 0)
			{
				if (CurrentClaims.Last().ClaimUser.UserPrincipal.GetUserLoginID() == user.GetUserLoginID())
				{
					return false;
				}
			}

			if (CurrentClaims.Count > 0)
			{
				var referenceCardIndex = GameCard
					.Ranks
					.FindIndex((item) =>
					{
						return item == referenceCard.Rank;
					});
				var recentClaimIndex = GameCard
					.Ranks
					.FindIndex((item) =>
					{
						return item == CurrentClaims.Last().Claims[0].Rank;
					});

				var lowerBound = recentClaimIndex - 1;
				if (lowerBound < 0)
				{
					lowerBound = GameCard.Ranks.Count - 1;
				}
				var upperBound = recentClaimIndex + 1;
				if (upperBound >= GameCard.Ranks.Count)
				{
					upperBound = 0;
				}
				if (
					referenceCard.Rank != GameCard.Ranks[lowerBound] &&
					referenceCard.Rank != GameCard.Ranks[recentClaimIndex] &&
					referenceCard.Rank != GameCard.Ranks[upperBound])
				{
					return false;
				}
			}

			var gameUser = GetPlayer(user);
			CurrentClaims.Add(new GameClaim(claims, actual, gameUser));

			foreach (var card in actual)
			{
				gameUser.Hand.Remove(card);
			}
			return true;
		}

		public bool IsVictory()
		{
			var gameUser = GetCurrentPlayerTurn();
			if (gameUser.Hand.Count <= 0)
			{
				return true;
			}
			return false;
		}

		public void EndTurn()
		{
			turnsIndex++;
			if (turnsIndex >= GameUsers.Count)
			{
				turnsIndex = 0;
			}
		}

		public bool IsCurrentTurn(ClaimsPrincipal user)
		{
			var gamePlayer = GetPlayer(user);
			return CurrentTurn(gamePlayer);
		}

		public bool CurrentTurn(GameUser gameUser)
		{
			GameUser currentUserTurn = GetCurrentPlayerTurn();
			if (currentUserTurn.UserPrincipal.GetUserLoginID() == gameUser.UserPrincipal.GetUserLoginID())
			{
				return true;
			}
			return false;
		}

		public GameUser GetCurrentPlayerTurn()
		{
			return GameUsers[turnsIndex];
		}

		public GameUser GetPlayer(ClaimsPrincipal user)
		{
			return GameUsers
			.Where(item => item.UserPrincipal.GetUserLoginID() == user.GetUserLoginID())
			.FirstOrDefault();
		}

		public GameUser GetPlayer(string userName)
		{
			return GameUsers
			.Where(item => item.UserPrincipal.GetUserName() == userName)
			.FirstOrDefault();
		}

		public void StartGame(List<ClaimsPrincipal> users)
		{
			List<GameCard> deck = instantiateDeck();
			GameUsers = new List<GameUser>();
			CurrentClaims = new List<GameClaim>();

			int interval = deck.Count / users.Count;
			for (int i = 0; i < users.Count; i++)
			{
				if (i == users.Count - 1)
				{
					List<GameCard> hand = deck;
					GameUsers.Add(new GameUser(i+1, users[i], hand));
				}
				else
				{
					List<GameCard> hand = new List<GameCard>();
					for (int j = 0; j < interval; j++)
					{
						GameCard lastCard = deck.Last();
						hand.Add(lastCard);
						deck.RemoveAt(deck.Count - 1);
					}
					GameUsers.Add(new GameUser(i+1, users[i], hand));
				}
			}
		}

		private List<GameCard> instantiateDeck()
		{
			List<GameCard> deck = new List<GameCard>();
			foreach (string suit in GameCard.Suits)
			{
				foreach (string rank in GameCard.Ranks)
				{
					GameCard card = new GameCard(rank, suit);
					deck.Add(card);
				}
			}

			shuffleDeck(deck);
			return deck;
		}

		private void shuffleDeck(List<GameCard> deck)
		{
			Random r = new Random();
			for (int n = deck.Count - 1; n > 0; --n)
			{
				int k = r.Next(n + 1);
				GameCard temp = deck[n];
				deck[n] = deck[k];
				deck[k] = temp;
			}
		}
	}
}
