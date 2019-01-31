using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Timers;
using TaccomStrike.Game.CallCheat.Models;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Game.CallCheat.Services
{
	public class GameLogicController
	{
		private int turnsIndex;
		private object gameLogicLock = new object();

		public List<GameUser> GameUsers { get; set; }
		public List<GameClaim> CurrentClaims { get; set; }
		public List<GameUser> UsersCallingCheat { get; set; }

		public GamePhase CurrentGamePhase { get; set; }
		public Timer turnTimer { get; set; }
		public Timer callTimer { get; set; }

		public GameState GetGameState(ClaimsPrincipal user)
		{
			lock(gameLogicLock)
			{
				GameState gameState = new GameState();
				gameState.UserTurn = GetCurrentPlayerTurn();
				gameState.User = GetPlayer(user);
				gameState.Claims = CurrentClaims;
				gameState.Players = GameUsers;

				if (CurrentClaims.Count > 0)
				{
					var recentClaimIndex = GameCard
						.Ranks
						.FindIndex((item) =>
						{
							return item == CurrentClaims.Last().Claims[0].Rank;
						});

					gameState.LowerBoundRank = GetLowerBoundRank(recentClaimIndex);
					gameState.UpperBoundRank = GetUpperBoundRank(recentClaimIndex);
					gameState.MiddleBoundRank = GetMiddleBoundRank(recentClaimIndex);
				}

				gameState.CurrentGamePhase = CurrentGamePhase;
				if(turnTimer!=null)
				{
					gameState.TurnPhaseDuration = turnTimer.Interval;
				}
				if(callTimer!=null)
				{
					gameState.CallPhaseDuration = callTimer.Interval;
				}
				return gameState;
			}
		}

		private GameCheat GameCheat()
		{
			var currentUser = GetCurrentPlayerTurn();

			var cheatCallSuccessful = false;
			var cheatCaller = UsersCallingCheat.First();
			var lastClaimUser = CurrentClaims.Last().ClaimUser;
			var preCheatClaims = CurrentClaims;

			var lastClaim = CurrentClaims.Last();
			for (int i = 0; i < lastClaim.Claims.Count; i++)
			{
				if (lastClaim.Claims[i].Rank != lastClaim.Actual[i].Rank)
				{
					cheatCallSuccessful = true;
					foreach (var claim in CurrentClaims)
					{
						foreach (var actualCard in claim.Actual)
						{
							lastClaimUser.Hand.Add(actualCard);
						}
					}

					CurrentClaims = new List<GameClaim>();
				}
			}

			foreach (var claim in CurrentClaims)
			{
				foreach (var actualCard in claim.Actual)
				{
					cheatCaller.Hand.Add(actualCard);
				}
			}
			CurrentClaims = new List<GameClaim>();
			UsersCallingCheat = new List<GameUser>();

			return new GameCheat
			{
				CheatCallSuccessful = cheatCallSuccessful,
				CheatCaller = cheatCaller,
				LastClaimUser = lastClaimUser,
				PreCheatClaims = preCheatClaims
			};
		}

		public void CallCheat(ClaimsPrincipal user)
		{
			lock(gameLogicLock)
			{
				if(CurrentGamePhase==GamePhase.TurnPhase)
				{
					return;
				}

				var gameUser = GetPlayer(user);
				if(!UsersCallingCheat.Contains(gameUser))
				{
					UsersCallingCheat.Add(gameUser);
				}
			}
		}

		public void SubmitClaim(ClaimsPrincipal user, List<GameCard> claims, List<GameCard> actual)
		{
			lock (gameLogicLock)
			{
				if (!IsCurrentTurn(user))
				{
					throw new Exception("Somebody may be cheating");
				}
				if (claims.Count != actual.Count)
				{
					throw new Exception("Somebody may be cheating");
				}
				if(turnTimer!=null)
				{
					turnTimer.Stop();
					turnTimer.Dispose();
				}

				var referenceCard = claims[0];
				foreach (var card in claims)
				{
					if (card.Rank != referenceCard.Rank)
					{
						throw new Exception("Somebody may be cheating");
					}
				}

				if (CurrentClaims.Count > 0)
				{
					if (CurrentClaims.Last().ClaimUser.UserPrincipal.GetUserLoginID() == user.GetUserLoginID())
					{
						throw new Exception("Somebody may be cheating");
					}
				}

				if (CurrentClaims.Count > 0)
				{
					var recentClaimIndex = GameCard
						.Ranks
						.FindIndex((item) =>
						{
							return item == CurrentClaims.Last().Claims[0].Rank;
						});

					var lowerBoundRank = GetLowerBoundRank(recentClaimIndex);
					var upperBoundRank = GetUpperBoundRank(recentClaimIndex);
					var middleBoundRank = GetMiddleBoundRank(recentClaimIndex);

					if (
						referenceCard.Rank != lowerBoundRank &&
						referenceCard.Rank != middleBoundRank &&
						referenceCard.Rank != upperBoundRank)
					{
						throw new Exception("Somebody may be cheating");
					}
				}

				var gameUser = GetPlayer(user);
				CurrentClaims.Add(new GameClaim(claims, actual, gameUser));

				foreach (var card in actual)
				{
					gameUser.Hand.Remove(card);
				}
			}
		}

		public void SubmitDefaultClaim()
		{
			var currentTurnUser = GetCurrentPlayerTurn();
			var defaultClaims = new List<GameCard>();
			var defaultActual = new List<GameCard>();

			var firstUserCard = currentTurnUser.Hand[0];
			defaultActual.Add(new GameCard() {
				Rank=firstUserCard.Rank,
				Suit=firstUserCard.Suit
			});
			if(CurrentClaims.Count>0)
			{
				var recentClaimIndex = GameCard
					.Ranks
					.FindIndex((item) =>
					{
						return item == CurrentClaims.Last().Claims[0].Rank;
					});
				var middleRank = GetMiddleBoundRank(recentClaimIndex);
				defaultClaims.Add(new GameCard() {
					Rank=middleRank
				});
			}
			else
			{
				var rank = GameCard.Ranks[0];
				defaultClaims.Add(new GameCard() {
					Rank=rank
				});
			}

			SubmitClaim(currentTurnUser.UserPrincipal, defaultClaims, defaultActual);
		}

		public void CallPhase(Action<GameLogicController, GameCheat> onGameCheat, Action<GameLogicController> onEndTurn)
		{
			lock(gameLogicLock)
			{
				callTimer = new Timer(5000);
				callTimer.Elapsed += (object sender, ElapsedEventArgs e) => {
					lock(gameLogicLock)
					{
						callTimer.Stop();
						callTimer.Dispose();
						if (CurrentGamePhase==GamePhase.TurnPhase)
						{
							return;
						}

						if(UsersCallingCheat.Count>0)
						{
							var gameCheat = GameCheat();
							EndTurn();
							onGameCheat(this, gameCheat);
						}
						else
						{
							EndTurn();
							onEndTurn(this);
						}
					}
				};
				callTimer.AutoReset = false;
				callTimer.Start();
				CurrentGamePhase = GamePhase.CallPhase;
			}
		}

		public void EndTurn()
		{
			turnsIndex++;
			if (turnsIndex >= GameUsers.Count)
			{
				turnsIndex = 0;
			}
		}

		public void StartTurn(Action<GameLogicController> onTurnTimeout)
		{
			lock(gameLogicLock)
			{
				CurrentGamePhase = GamePhase.TurnPhase;
				turnTimer = new Timer(20000);
				turnTimer.Elapsed += (object sender, ElapsedEventArgs e) =>
				{
					lock(gameLogicLock)
					{
						turnTimer.Stop();
						turnTimer.Dispose();

						SubmitDefaultClaim();
						onTurnTimeout(this);
					}
				};
				turnTimer.AutoReset = false;
				turnTimer.Start();
			}
		}

		public void StartGame(List<ClaimsPrincipal> users)
		{
			List<GameCard> deck = instantiateDeck();
			GameUsers = new List<GameUser>();
			CurrentClaims = new List<GameClaim>();
			UsersCallingCheat = new List<GameUser>();

			int interval = deck.Count / users.Count;
			for (int i = 0; i < users.Count; i++)
			{
				if (i == users.Count - 1)
				{
					List<GameCard> hand = deck;
					GameUsers.Add(new GameUser(i + 1, users[i], hand));
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
					GameUsers.Add(new GameUser(i + 1, users[i], hand));
				}
			}
		}

		private string GetLowerBoundRank(int recentClaimIndex)
		{
			var lowerBound = recentClaimIndex - 1;
			if (lowerBound < 0)
			{
				lowerBound = GameCard.Ranks.Count - 1;
			}
			return GameCard.Ranks[lowerBound];
		}

		private string GetUpperBoundRank(int recentClaimIndex)
		{
			var upperBound = recentClaimIndex + 1;
			if (upperBound >= GameCard.Ranks.Count)
			{
				upperBound = 0;
			}
			return GameCard.Ranks[upperBound];
		}

		private string GetMiddleBoundRank(int recentClaimIndex)
		{
			return GameCard.Ranks[recentClaimIndex];
		}

		private bool IsVictory()
		{
			var gameUser = GetCurrentPlayerTurn();
			if (gameUser.Hand.Count <= 0)
			{
				return true;
			}
			return false;
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
