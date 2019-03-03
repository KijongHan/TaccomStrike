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

		private int preparationPhaseDuration;
		private int callPhaseDuration;
		private int turnPhaseDuration;

		private List<int> gameRankingScores;

		public long GameLobbyID { get; set; }

		public List<GameUser> GameUsers { get; set; }
		public List<GameClaim> CurrentClaims { get; set; }
		public List<GameUser> UsersCallingCheat { get; set; }

		public GamePhase CurrentGamePhase { get; set; }
		public Timer PreparationTimer { get; set; }
		public Timer TurnTimer { get; set; }
		public Timer CallTimer { get; set; }

		public List<string> ActionHistory { get; set; }

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
				if(TurnTimer!=null)
				{
					gameState.TurnPhaseDuration = TurnTimer.Interval;
				}
				if(CallTimer!=null)
				{
					gameState.CallPhaseDuration = CallTimer.Interval;
				}
				if(PreparationTimer!=null)
				{
					gameState.PreparationPhaseDuration = PreparationTimer.Interval;
				}

				gameState.ActionHistory = ActionHistory;
				return gameState;
			}
		}

		public GameResult GetGameResult()
		{
			lock(gameLogicLock)
			{
				var usersRanked = GameUsers.OrderBy((i) => i.State!=GameUserState.Connected).ThenBy((i) => i.Hand.Count).ToList();
				return new GameResult
				{
					UsersRanking=usersRanked,
					RankingScores=gameRankingScores
				};
			}
		}

		private GameCheat GameCheat()
		{
			var currentUser = GetCurrentPlayerTurn();

			var cheatCallSuccessful = false;
			var cheatCaller = GetCheatCaller();
			var lastClaimUser = CurrentClaims.Last().ClaimUser;
			var preCheatClaims = CurrentClaims;

			if(cheatCaller==null)
			{
				return null;
			}

			var lastClaim = CurrentClaims.Last();
			for (int i = 0; i < lastClaim.Claims.Count; i++)
			{
				if (lastClaim.Claims[i].Rank != lastClaim.Actual[i].Rank)
				{
					cheatCallSuccessful = true;
					continue;
				}
			}

			var rankToCountMappings = new Dictionary<string, int>();
			lastClaim.Actual.ForEach((value) =>
			{
				if (rankToCountMappings.ContainsKey(value.Rank))
				{
					rankToCountMappings[value.Rank] = rankToCountMappings[value.Rank] + 1;
				}
				else
				{
					rankToCountMappings[value.Rank] = 1;
				}
			});
			var actualCards = new List<string>();
			foreach(var pair in rankToCountMappings)
			{
				actualCards.Add($"×{pair.Value} {pair.Key}");
			}
			if (cheatCallSuccessful)
			{
				var claimCardsCount = 0;
				foreach (var claim in CurrentClaims)
				{
					foreach (var actualCard in claim.Actual)
					{
						claimCardsCount += 1;
						lastClaimUser.Hand.Add(actualCard, actualCard);
					}
				}
				ActionHistory.Add($"Call Cheat Success!");
				ActionHistory.Add($"Call Cheat Success! {cheatCaller.UserPrincipal.GetUserName()} is the cheat caller. {lastClaimUser.UserPrincipal.GetUserName()} collected {claimCardsCount} cards. Actual cards were {String.Join(",", actualCards)}");
			}
			else
			{
				var claimCardsCount = 0;
				foreach (var claim in CurrentClaims)
				{
					foreach (var actualCard in claim.Actual)
					{
						claimCardsCount += 1;
						cheatCaller.Hand.Add(actualCard, actualCard);
					}
				}
				ActionHistory.Add($"Call Cheat Failed!");
				ActionHistory.Add($"{cheatCaller.UserPrincipal.GetUserName()} is the cheat caller. {cheatCaller.UserPrincipal.GetUserName()} collected {claimCardsCount} cards. Actual cards were {String.Join(",", actualCards)}");
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
				ActionHistory.Add($"{user.GetUserName()} is calling cheat!");
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
				if(TurnTimer!=null)
				{
					TurnTimer.Stop();
					TurnTimer.Dispose();
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
				ActionHistory.Add($"{user.GetUserName()} has submitted {claims.Count} cards, with claim {referenceCard.Rank}");
			}
		}

		public void SubmitDefaultClaim()
		{
			var currentTurnUser = GetCurrentPlayerTurn();
			var defaultClaims = new List<GameCard>();
			var defaultActual = new List<GameCard>();

			var firstUserCard = currentTurnUser.Hand.First().Value;
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

		public void CallPhase(Action<long, GameCheat> onGameCheat, Action<long> onEndTurn, Action<long> onGameFinish)
		{
			lock(gameLogicLock)
			{
				CallTimer = new Timer(callPhaseDuration);
				CallTimer.Elapsed += (object sender, ElapsedEventArgs e) => {
					lock(gameLogicLock)
					{
						CallTimer.Stop();
						CallTimer.Dispose();
						if (CurrentGamePhase==GamePhase.TurnPhase)
						{
							return;
						}

						if(UsersCallingCheat.Count>0)
						{
							var gameCheat = GameCheat();
							if (IsVictory())
							{
								onGameFinish(GameLobbyID);
							}
							else
							{
								EndTurn();
								onGameCheat(GameLobbyID, gameCheat);
							}
						}
						else
						{
							if (IsVictory())
							{
								onGameFinish(GameLobbyID);
							}
							else
							{
								EndTurn();
								onEndTurn(GameLobbyID);
							}
						}
					}
				};
				CallTimer.AutoReset = false;
				CallTimer.Start();
				CurrentGamePhase = GamePhase.CallPhase;
			}
		}

		public void EndTurn()
		{
			turnsIndex++;
			if (turnsIndex >= GameUsers.Where((i) => i.State==GameUserState.Connected).ToList().Count)
			{
				turnsIndex = 0;
			}
		}

		public void StartTurn(Action<long> onTurnTimeout)
		{
			lock(gameLogicLock)
			{
				CurrentGamePhase = GamePhase.TurnPhase;
				TurnTimer = new Timer(turnPhaseDuration);
				TurnTimer.Elapsed += (object sender, ElapsedEventArgs e) =>
				{
					lock(gameLogicLock)
					{
						TurnTimer.Stop();
						TurnTimer.Dispose();

						SubmitDefaultClaim();
						onTurnTimeout(GameLobbyID);
					}
				};
				TurnTimer.AutoReset = false;
				TurnTimer.Start();
			}
		}

		public void StartGame(
			List<ClaimsPrincipal> users, 
			long gameLobbyID, 
			int callPhaseDuration, 
			int turnPhaseDuration, 
			int preparationPhaseDuration,
			Action<long> onPreparationEnd,
			List<int> gameScores)
		{
			List<GameCard> deck = instantiateDeck();
			GameUsers = new List<GameUser>();
			CurrentClaims = new List<GameClaim>();
			UsersCallingCheat = new List<GameUser>();
			ActionHistory = new List<string>();
			GameLobbyID = gameLobbyID;

			this.callPhaseDuration = callPhaseDuration;
			this.turnPhaseDuration = turnPhaseDuration;
			this.preparationPhaseDuration = preparationPhaseDuration;
			this.gameRankingScores = gameScores;

			lock (gameLogicLock)
			{
				int interval = deck.Count / users.Count;
				for (int i = 0; i < users.Count; i++)
				{
					if (i == users.Count - 1)
					{
						SortedList<GameCard, GameCard> hand = new SortedList<GameCard, GameCard>(new GameCardRankComparer());
						foreach (var card in deck)
						{
							hand.Add(card, card);
						}
						GameUsers.Add(new GameUser(i + 1, users[i], hand, GameUserState.Connected));
					}
					else
					{
						SortedList<GameCard, GameCard> hand = new SortedList<GameCard, GameCard>(new GameCardRankComparer());
						for (int j = 0; j < interval; j++)
						{
							GameCard lastCard = deck.Last();
							hand.Add(lastCard, lastCard);
							deck.RemoveAt(deck.Count - 1);
						}
						GameUsers.Add(new GameUser(i + 1, users[i], hand, GameUserState.Connected));
					}
				}

				CurrentGamePhase = GamePhase.PreparationPhase;
				PreparationTimer = new Timer(preparationPhaseDuration);
				PreparationTimer.Elapsed += (object sender, ElapsedEventArgs e) =>
				{
					lock (gameLogicLock)
					{
						PreparationTimer.Stop();
						PreparationTimer.Dispose();

						onPreparationEnd(GameLobbyID);
					}
				};
				PreparationTimer.AutoReset = false;
				PreparationTimer.Start();
			}
		}

		private GameUser GetCheatCaller()
		{
			var orderedCheatCallers = UsersCallingCheat.Where((i) => i.State==GameUserState.Connected).OrderBy((i) => i.GameUserID).ToList();
			var currentTurnUserID = GetCurrentPlayerTurn().GameUserID;

			var cheatCaller = orderedCheatCallers.Where((i) => i.GameUserID > currentTurnUserID).FirstOrDefault();
			if(cheatCaller==null)
			{
				cheatCaller = orderedCheatCallers.FirstOrDefault();
			}
			return cheatCaller;
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
			if(GameUsers.Where((i) => i.State==GameUserState.Connected).Count()==1)
			{
				return true;
			}
			return false;
		}

		public void GameUserLeave(ClaimsPrincipal userLeaving, Action<long> onTurnTimeout, Action<long> onGameFinish)
		{
			lock(gameLogicLock)
			{
				var user = GameUsers
						.Where((i) => i.UserPrincipal.GetUserLoginID() == userLeaving.GetUserLoginID())
						.FirstOrDefault();
				if (GetCurrentPlayerTurn().UserPrincipal.GetUserLoginID() == user.UserPrincipal.GetUserLoginID() && CurrentGamePhase==GamePhase.TurnPhase)
				{
					TurnTimer.Stop();
					onTurnTimeout(GameLobbyID);
				}

				user.State = GameUserState.Disconnected;

				var rankToCountMappings = new Dictionary<string, int>();
				user.Hand.Select((i) => i.Value).ToList().ForEach((value) =>
				{
					if (rankToCountMappings.ContainsKey(value.Rank))
					{
						rankToCountMappings[value.Rank] = rankToCountMappings[value.Rank] + 1;
					}
					else
					{
						rankToCountMappings[value.Rank] = 1;
					}
				});
				var handList = new List<string>();
				foreach (var pair in rankToCountMappings)
				{
					handList.Add($"×{pair.Value} {pair.Key}");
				}
				ActionHistory.Add($"{user.UserPrincipal.GetUserName()} has left. His cards are out of play: {String.Join(",", handList)}");

				if (IsVictory())
				{
					onGameFinish(GameLobbyID);
				}
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
			if(turnsIndex>=GameUsers.Where((i) => i.State == GameUserState.Connected).ToList().Count)
			{
				turnsIndex = 0;
			}
			return GameUsers.Where((i) => i.State==GameUserState.Connected).ToList()[turnsIndex];
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
