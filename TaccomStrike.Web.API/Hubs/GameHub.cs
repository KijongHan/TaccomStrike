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

namespace TaccomStrike.Web.API.Hubs
{
	public class GameHub : Hub
	{
		private GameLobbyService gameLobbyService;
		private UserConnectionsService userConnectionsService;

		public GameHub(GameLobbyService gameLobbyService, UserConnectionsService userConnectionsService)
		{
			this.gameLobbyService = gameLobbyService;
			this.userConnectionsService = userConnectionsService;
		}

		public Task GameCallCheat(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				if(gameLobby.HasUser(Context.User))
				{
					if(!gameLobby.GameLogicController.IsCurrentTurn(Context.User))
					{
						var cheatCaller = gameLobby.GameLogicController.GetPlayer(Context.User.GetUserName());
						var lastClaimUser = gameLobby.GameLogicController.CurrentClaims.Last().ClaimUser;
						var preCheatClaims = gameLobby.GameLogicController.CurrentClaims;
						var cheatCallSuccess = gameLobby.GameLogicController.CallCheat(Context.User);

						foreach(var gameUser in gameLobby.Players)
						{
							var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
							var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

							var apiObject = new GameCallCheat
							{
								GameState = new GetGameState(gameState),
								CheatCaller = new GetGameUser(cheatCaller),
								LastClaimUser = new GetGameUser(lastClaimUser),
								PreCheatCallClaims = preCheatClaims.ApiGetGameClaims(),
								CheatCallSuccess = cheatCallSuccess
							};
							Clients.Client(connection).GameCallCheat(apiObject);
						}
					}
				}
			});
		}

		public Task GameClaim(long gameLobbyID, List<GameCard> claims, List<GameCard> actual)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				if(gameLobby.HasUser(Context.User))
				{
					if(gameLobby.GameLogicController.IsCurrentTurn(Context.User))
					{
						var successful = gameLobby.GameLogicController.SubmitClaim(Context.User, claims, actual);

						if(successful)
						{
							foreach(var gameUser in gameLobby.Players)
							{
								var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
								var connection = userConnectionsService.GameConnectionService.GetConnection(gameUser);

								var apiObject = new HubApi.GameClaim
								{
									GameState = new GetGameState(gameState)
								};
								Clients.Client(connection).GameClaim(apiObject);
							}
						}
					}
				}
			});
		}

		public Task GameEndTurn(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				if(gameLobby.HasUser(Context.User))
				{
					if(gameLobby.GameLogicController.IsCurrentTurn(Context.User))
					{
						if(gameLobby.GameLogicController.IsVictory())
						{
							//Console.WriteLine("Victory!");
						}
						else
						{
							gameLobby.GameLogicController.EndTurn();

							foreach(var user in gameLobby.Players)
							{
								var connection = userConnectionsService.GameConnectionService.GetConnection(user);
								var gameState = gameLobby.GameLogicController.GetGameState(user);

								var apiObject = new GameEndTurn
								{
									GameState = new GetGameState(gameState)
								};
								Clients.Client(connection).GameEndTurn(apiObject);
							}
						}
					}
				}
			});
		}

		public Task GameLobbyStartGame(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
				if(gameLobby.HasUser(Context.User))
				{
					var gameStarted = gameLobby.StartGame();
					if(!gameStarted)
					{
						return;
					}

					foreach(var user in gameLobby.Players)
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
			});
		}

		public Task GameLobbyLeave(long gameLobbyID)
		{
			return Task.Run(() => 
			{
				var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

				if(gameLobby.HasUser(Context.User))
				{
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

					foreach(var user in gameLobby.GetUsers())
					{
						var connection = userConnectionsService.GameConnectionService.GetConnection(user);
						Clients.Client(connection).GameLobbyLeaveGame(apiObject);
					}

					gameLobby.RemoveUser(Context.User);
					Context.User.SetCurrentGameLobbyID(null);
					if (gameLobby.GetUsers().Count <= 0)
					{
						gameLobbyService.RemoveGameLobby(gameLobbyID);
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

				if (gameLobby.GameLobbyType==GameLobby.LobbyType.Public)
				{
					if(gameLobby.GetUsersCount()>=gameLobby.MaxRoomLimit)
					{
						Clients.Client(userConnection).GameLobbyJoin(null);
						return;
					}
					if(gameLobby.InGame())
					{
						Clients.Client(userConnection).GameLobbyJoin(null);
						return;
					}
					else
					{
						if(!gameLobby.HasUser(Context.User))
						{
							gameLobby.AddUser(Context.User);    
						}
						Context.User.SetCurrentGameLobbyID(gameLobbyID);
						
						var apiObject = new GameLobbyJoin
						{
							NewUser = newUser,
							GameLobby = gameLobby.ApiGetGameLobby()
						};

						foreach(var user in gameLobby.GetUsers())
						{
							lock(userConnectionsService.GameConnectionService.ConnectionLock)
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
			lock(userConnectionsService.GameConnectionService.ConnectionLock)
			{
				userConnectionsService.GameConnectionService.Add(Context.User, Context.ConnectionId);
				return base.OnConnectedAsync();
			}
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			lock(userConnectionsService.GameConnectionService.ConnectionLock)
			{
				var currentGameLobbyID = Context.User.GetCurrentGameLobbyID();
			
				if(currentGameLobbyID!=null)
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
						if(connection == null)
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
}