using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Utility;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Web.API.HubApi;
using TaccomStrike.Library.Data.ApiEntities;
using TaccomStrike.Game.CallCheat;
using TaccomStrike.Library.Data.Extensions;
using System.Timers;
using TaccomStrike.Game.CallCheat.Services;
using TaccomStrike.Game.CallCheat.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace TaccomStrike.Web.API.Hubs
{
	[Authorize]
	[EnableCors("AllowSpecificOrigin")]
	public class GameHub : Hub
	{
		private IHubContext<GameHub> gameHubContext;
		private GameLobbyService gameLobbyService;
		private UserConnectionsService userConnectionsService;

		public GameHub(GameLobbyService gameLobbyService, UserConnectionsService userConnectionsService, IHubContext<GameHub> gameHubContext)
		{
			this.gameLobbyService = gameLobbyService;
			this.userConnectionsService = userConnectionsService;
			this.gameHubContext = gameHubContext;
		}

		public Task GameCallCheat(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				gameLobby.GameLogicController.CallCheat(Context.User);
			});
		}

		public Task GameSubmitClaim(long gameLobbyID, List<GetGameCard> claims, List<GetGameCard> actual)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				gameLobby.GameLogicController.SubmitClaim(Context.User, claims.GetGameCards(), actual.GetGameCards());
				gameLobby.GameLogicController.CallPhase(OnGameCheat, OnEndTurn, OnGameFinish);

				foreach (var gameUser in gameLobby.Players)
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

		public void OnGameCheat(GameLogicController gameLogicController, GameCheat gameCheat)
		{
			gameLogicController.StartTurn(OnTurnTimeout);

			foreach (var gameUser in gameLogicController.GameUsers)
			{
				var gameState = gameLogicController.GetGameState(gameUser.UserPrincipal);
				var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser.UserPrincipal);

				var apiObject = new GameCallCheat
				{
					GameState = new GetGameState(gameState),
					GameCheat = new GetGameCheat(gameCheat)
				};
				gameHubContext.Clients.Client(connection).GameCallCheat(apiObject);
			}
		}

		public void OnEndTurn(GameLogicController gameLogicController)
		{
			gameLogicController.StartTurn(OnTurnTimeout);

			foreach (var gameUser in gameLogicController.GameUsers)
			{
				var gameState = gameLogicController.GetGameState(gameUser.UserPrincipal);
				var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser.UserPrincipal);

				var apiObject = new HubApi.GameClaim
				{
					GameState = new GetGameState(gameState)
				};
				gameHubContext.Clients.Client(connection).GameClaim(apiObject);
			}
		}

		public void OnTurnTimeout(GameLogicController gameLogicController)
		{
			gameLogicController.CallPhase(OnGameCheat, OnEndTurn, OnGameFinish);

			foreach (var gameUser in gameLogicController.GameUsers)
			{
				var gameState = gameLogicController.GetGameState(gameUser.UserPrincipal);
				var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser.UserPrincipal);

				var apiObject = new HubApi.GameClaim
				{
					GameState = new GetGameState(gameState)
				};
				gameHubContext.Clients.Client(connection).GameClaim(apiObject);
			}
		}

		public void OnGameFinish(GameLogicController gameLogicController, GameUser winner)
		{
			foreach (var gameUser in gameLogicController.GameUsers)
			{
				var gameState = gameLogicController.GetGameState(gameUser.UserPrincipal);
				var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser.UserPrincipal);

				var apiObject = new HubApi.GameFinish
				{
					Winner = new GetGameUser(winner)
				};
				gameHubContext.Clients.Client(connection).GameFinish(apiObject);
			}
		}

		public Task GameLobbyStartGame(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				lock(gameLobby)
				{
					if (gameLobby.HasUser(Context.User))
					{
						var gameStarted = gameLobby.StartGame();
						gameLobby.GameLogicController.StartTurn(OnTurnTimeout);
						if (!gameStarted)
						{
							return;
						}

						foreach (var user in gameLobby.Players)
						{
							var connection = userConnectionsService.GameConnectionService.GetConnection(user);
							var gameState = gameLobby.GameLogicController.GetGameState(user);

							var apiObject = new GameLobbyStartGame
							{
								GameState = new GetGameState(gameState)
							};
							Clients.Client(connection).GameLobbyStartGame(apiObject);
						}
					}
				}
			});
		}

		public Task GameLobbyLeaveGame(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				lock(gameLobby)
				{
					if (gameLobby.HasUser(Context.User))
					{
						gameLobby.RemoveUser(Context.User);
						Context.User.SetCurrentGameLobbyID(null);

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
							}
							var userConnection = userConnectionsService.GameConnectionService.GetConnection(Context.User);
							Clients.Client(userConnection).GameLobbyLeaveGame(apiObject);
						}
					}
				}
			});
		}

		public Task GameLobbyJoin(long gameLobbyID)
		{
			return Task.Run(() =>
			{
				var userConnection = userConnectionsService.GameConnectionService.GetConnection(Context.User);
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				var newUser = Context.User.ApiGetUser();

				lock(gameLobby)
				{
					if (gameLobby.GameLobbyType == GameLobby.LobbyType.Public)
					{
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
							Context.User.SetCurrentGameLobbyID(gameLobbyID);

							var apiObject = new GameLobbyJoin
							{
								NewUser = newUser,
								GameLobby = gameLobby.ApiGetGameLobby()
							};

							foreach (var user in gameLobby.GetUsers())
							{
								var connection = userConnectionsService.GameConnectionService.GetConnection(user);
								Clients.Client(connection).GameLobbyJoin(apiObject);
							}
						}
					}
				}
			});
		}

		public Task GameLobbySendMessage(string message, long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				if(gameLobby.HasUser(Context.User))
				{
					ChatMessage chatMessage = new ChatMessage
					{
						User = Context.User,
						Message = message,
						WhenCreated = DateTime.Now
					};
					var apiObject = new GameLobbySendMessage
					{
						ChatMessage = chatMessage.ApiGetChatMessage()
					};

					foreach(var participant in gameLobby.GetUsers())
					{
						var connection = userConnectionsService.GameConnectionService.GetConnection(participant);
						Clients.Client(connection).GameLobbySendMessage(apiObject);
					}
				}
			});
		}

		public override Task OnConnectedAsync()
		{
			userConnectionsService.GameConnectionService.Add(Context.User, Context.ConnectionId);
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			var currentGameLobbyID = Context.User.GetCurrentGameLobbyID();

			if (currentGameLobbyID != null)
			{
				var gameLobby = gameLobbyService.GetGameLobby(currentGameLobbyID.Value);
				gameLobby.RemoveUser(Context.User);
				Context.User.SetCurrentGameLobbyID(null);

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

				foreach (var user in gameLobby.GetUsers())
				{
					var connection = userConnectionsService.GameConnectionService.GetConnection(user);
					if (connection == null)
					{
						continue;
					}

					Clients.Client(connection).GameLobbyLeaveGame(apiObject);
				}

				if (gameLobby.GetUsers().Count <= 0)
				{
					gameLobbyService.RemoveGameLobby(currentGameLobbyID.Value);
				}
			}

			userConnectionsService.GameConnectionService.Remove(Context.User, Context.ConnectionId);
			return base.OnDisconnectedAsync(exception);
		}
	}
}