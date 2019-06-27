using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using CallCheatOnline.Library.Data.Services;
using CallCheatOnline.Library.Utility.Security;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Data.Utility;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Web.API.HubApi;
using CallCheatOnline.Library.Data.ApiEntities;
using CallCheatOnline.Game.CallCheat;
using CallCheatOnline.Library.Data.Extensions;
using CallCheatOnline.Game.CallCheat.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using CallCheatOnline.Library.Data.Enums;
using CallCheatOnline.Library.Data.DAL;
using System.Linq;

namespace CallCheatOnline.Web.API.Hubs
{
	[Authorize]
	[EnableCors("AllowSpecificOrigin")]
	public class GameHub : Hub
	{
		private IHubContext<GameHub> gameHubContext;
		private GameLobbyService gameLobbyService;
		private UserConnectionsService userConnectionsService;
		private GameUserRepository gameUserRepository;

		public GameHub(GameLobbyService gameLobbyService, UserConnectionsService userConnectionsService, IHubContext<GameHub> gameHubContext, GameUserRepository gameUserRepository)
		{
			this.gameLobbyService = gameLobbyService;
			this.userConnectionsService = userConnectionsService;
			this.gameHubContext = gameHubContext;
			this.gameUserRepository = gameUserRepository;
		}

		public Task GameCallCheat(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if(gameLobby==null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					gameLobby.GameLogicController.CallCheat(Context.User);
				});
			});
		}

		public Task GameSubmitClaim(long gameLobbyID, List<GetGameCard> claims, List<GetGameCard> actual)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if (gameLobby == null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					gameLobby.GameLogicController.SubmitClaim(Context.User, claims.GetGameCards(), actual.GetGameCards());
					gameLobby.GameLogicController.CallPhase(OnGameCheat, OnEndTurn, OnGameFinish);

					foreach (var gameUser in gameLobby.GetUsers())
					{
						var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
						var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

						var apiObject = new HubApi.GameClaim
						{
							GameState = new GetGameState(gameState)
						};
						gameHubContext.Clients.Client(connection).GameClaim(apiObject);
					}
				});
			});
		}

		public void OnGameCheat(long gameLobbyID, GameCheat gameCheat)
		{
			var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
			if (gameLobby == null)
			{
				return;
			}
			gameLobby.UseLobbyLock(() =>
			{
				gameLobby.GameLogicController.StartTurn(OnTurnTimeout);
				if(gameCheat==null)
				{
					foreach (var gameUser in gameLobby.GetUsers())
					{
						var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
						var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

						var apiObject = new GameCallCheat
						{
							GameState = new GetGameState(gameState),
							GameCheat = null
						};
						gameHubContext.Clients.Client(connection).GameCallCheat(apiObject);
					}
				}
				else
				{
					foreach (var gameUser in gameLobby.GetUsers())
					{
						var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
						var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

						var apiObject = new GameCallCheat
						{
							GameState = new GetGameState(gameState),
							GameCheat = new GetGameCheat(gameCheat)
						};
						gameHubContext.Clients.Client(connection).GameCallCheat(apiObject);
					}
				}
			});
		}

		public void OnEndTurn(long gameLobbyID)
		{
			var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
			if (gameLobby == null)
			{
				return;
			}
			gameLobby.UseLobbyLock(() =>
			{
				gameLobby.GameLogicController.StartTurn(OnTurnTimeout);

				foreach (var gameUser in gameLobby.GetUsers())
				{
					var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
					var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

					var apiObject = new HubApi.GameClaim
					{
						GameState = new GetGameState(gameState)
					};
					gameHubContext.Clients.Client(connection).GameClaim(apiObject);
				}
			});
		}

		public void OnTurnTimeout(long gameLobbyID)
		{
			var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
			if (gameLobby == null)
			{
				return;
			}
			gameLobby.UseLobbyLock(() =>
			{
				gameLobby.GameLogicController.CallPhase(OnGameCheat, OnEndTurn, OnGameFinish);

				foreach (var gameUser in gameLobby.GetUsers())
				{
					var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
					var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

					var apiObject = new HubApi.GameClaim
					{
						GameState = new GetGameState(gameState)
					};
					gameHubContext.Clients.Client(connection).GameClaim(apiObject);
				}
			});
		}

		public void OnGameFinish(long gameLobbyID)
		{
			var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
			if (gameLobby == null)
			{
				return;
			}
			gameLobby.UseLobbyLock(() =>
			{
				var result = gameLobby.GameLogicController.GetGameResult();
				//gameUserRepository.UpdateGameScores(result.UsersRanking.Select((v) => v.UserPrincipal).ToList(), result.RankingScores);

				foreach (var gameUser in gameLobby.GetUsers())
				{
					gameUser.SetCurrentGameLobbyID(null);
					var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
					var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

					var apiObject = new HubApi.GameFinish
					{
						GameResult = new GetGameResult(result)
					};
					gameHubContext.Clients.Client(connection).GameFinish(apiObject);
				}

				gameLobbyService.RemoveGameLobby(gameLobbyID);
			});
		}

		public Task GameLobbyStartGame(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if (gameLobby == null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					if (gameLobby.HasUser(Context.User))
					{
						var gameStarted = gameLobby.StartGame(OnEndTurn);
						if (!gameStarted)
						{
							return;
						}

						Parallel.ForEach(gameLobby.GetUsers(), (user) =>
						{
							var connection = userConnectionsService.GameConnectionService.GetConnection(user);
							var gameState = gameLobby.GameLogicController.GetGameState(user);

							var apiObject = new GameLobbyStartGame
							{
								GameState = new GetGameState(gameState)
							};
							Clients.Client(connection).GameLobbyStartGame(apiObject);
						});
					}
				});
			});
		}

		public Task GameLobbyLeaveGame(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if (gameLobby == null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					if (gameLobby.HasUser(Context.User))
					{
						gameLobby.RemoveUser(Context.User, OnGameFinish, OnTurnTimeout);

						var playerLeaving = Context
							.User
							.ApiGetUser();
						var host = gameLobby
							.GetHost()
							.ApiGetUser();
						var players = gameLobby
							.GetUsers()
							.ApiGetUsers();
						var apiObject = new GameLobbyLeaveGame
						{
							PlayerLeaving = playerLeaving,
							Host = host,
							Players = players
						};

						var message = new GameLobbySendMessage
						{
							MessageType = GameLobbyMessageType.System,
							ChatMessage = new GetChatMessage(new ChatMessage
							{
								Message = $"{Context.User.GetUserName()} has left the game lobby",
								WhenCreated = DateTime.Now
							})
						};

						if (gameLobby.GetUsers().Count <= 0)
						{
							gameLobbyService.RemoveGameLobby(gameLobbyID);
							var connection = userConnectionsService.GameConnectionService.GetConnection(Context.User);
							Clients.Client(connection).GameLobbyLeaveGame(apiObject);
						}
						else
						{
							foreach (var user in gameLobby.GetUsers())
							{
								var connection = userConnectionsService.GameConnectionService.GetConnection(user);
								Clients.Client(connection).GameLobbyLeaveGame(apiObject);
								Clients.Client(connection).GameLobbySendMessage(message);
							}
							var userConnection = userConnectionsService.GameConnectionService.GetConnection(Context.User);
							Clients.Client(userConnection).GameLobbyLeaveGame(apiObject);
						}
						Context.User.SetCurrentGameLobbyID(null);
					}
				});
			});
		}

		public Task GameLobbyJoin(long gameLobbyID)
		{
			return Task.Run(() =>
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if (gameLobby == null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					var userConnection = userConnectionsService.GameConnectionService.GetConnection(Context.User);
					var newUser = Context.User.ApiGetUser();

					if (gameLobby.GetUsersCount() >= gameLobby.MaxRoomLimit)
					{
						Clients.Client(userConnection).GameLobbyJoin(null);
						return;
					}
					if (gameLobby.InGame())
					{
						Clients.Client(userConnection).GameLobbyJoin(null);
						return;
					}
					else
					{
						if (!gameLobby.HasUser(Context.User))
						{
							gameLobby.AddUser(Context.User);
						}

						var apiObject = new GameLobbyJoin
						{
							NewUser = newUser,
							GameLobby = gameLobby.ApiGetGameLobby()
						};

						var message = new GameLobbySendMessage
						{
							MessageType = GameLobbyMessageType.System,
							ChatMessage = new GetChatMessage(new ChatMessage
							{
								User = null,
								Message = $"{newUser.Username} has joined the game lobby",
								WhenCreated = DateTime.Now
							})
						};

						foreach (var user in gameLobby.GetUsers())
						{
							var connection = userConnectionsService.GameConnectionService.GetConnection(user);
							Clients.Client(connection).GameLobbyJoin(apiObject);
							Clients.Client(connection).GameLobbySendMessage(message);
						}
						Context.User.SetCurrentGameLobbyID(gameLobbyID);
					}
				});
			});
		}

		public Task GameLobbySendMessage(string message, long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if (gameLobby == null)
				{
					return;
				}
				gameLobby.UseLobbyLock(() =>
				{
					if (gameLobby.HasUser(Context.User))
					{
						ChatMessage chatMessage = new ChatMessage
						{
							User = Context.User,
							Message = message,
							WhenCreated = DateTime.Now
						};
						var apiObject = new GameLobbySendMessage
						{
							MessageType = GameLobbyMessageType.User,
							ChatMessage = chatMessage.ApiGetChatMessage()
						};

						foreach (var participant in gameLobby.GetUsers())
						{
							var connection = userConnectionsService.GameConnectionService.GetConnection(participant);
							Clients.Client(connection).GameLobbySendMessage(apiObject);
						}
					}
				});
			});
		}

		public override Task OnConnectedAsync()
		{
			userConnectionsService.GameConnectionService.Add(Context.User, Context.ConnectionId);
			return base.OnConnectedAsync();
		}

		public override async Task OnDisconnectedAsync(Exception exception)
		{
			var currentGameLobbyID = Context.User.GetCurrentGameLobbyID();

			if (currentGameLobbyID != null)
			{
				await GameLobbyLeaveGame(currentGameLobbyID.Value);
			}

			userConnectionsService.GameConnectionService.Remove(Context.User, Context.ConnectionId);
			await base.OnDisconnectedAsync(exception);
		}
	}
}