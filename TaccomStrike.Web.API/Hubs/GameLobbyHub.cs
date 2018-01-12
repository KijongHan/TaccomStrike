using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.Hubs {

    public class GameLobbyHub : Hub {

        private GameLobbyService gameLobbyService;
        private UserConnectionService userConnectionService;

        public GameLobbyHub(GameLobbyService gameLobbyService, UserConnectionService userConnectionService) {
            this.gameLobbyService = gameLobbyService;
            this.userConnectionService = userConnectionService;
        }

        public Task GameCallCheat(string gameLobbyID) {
            return Task.Run(() => {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

                if(gameLobby.HasUser(Context.User)) {
                    if(!gameLobby.GameLogicController.IsCurrentTurn(Context.User)) {
                        var cheatCallerUserName = Context.User.GetUserName();
                        var lastClaimUserName = gameLobby.GameLogicController.CurrentClaims.Last().ClaimUserName;
                        var preCheatClaims = gameLobby.GameLogicController.CurrentClaims;
                        var cheatCallSuccess = gameLobby.GameLogicController.CallCheat(Context.User);

                        foreach(var gameUser in gameLobby.Players) {
                            var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
                            var connections = userConnectionService.GetConnections(gameUser);

                            foreach(var connection in connections) {
                                Clients.Client(connection).InvokeAsync(
                                        "GameCallCheat",
                                        new object[] {
                                            gameState,
                                            cheatCallerUserName,
                                            lastClaimUserName,
                                            preCheatClaims,
                                            cheatCallSuccess
                                        });
                            }
                        }
                    }
                }
            });
        }

        public Task GameClaim(string gameLobbyID, List<GameCardEntity> claims, List<GameCardEntity> actual) {
            return Task.Run(() => {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

                if(gameLobby.HasUser(Context.User)) {
                    if(gameLobby.GameLogicController.IsCurrentTurn(Context.User)) {
                        var successful = gameLobby.GameLogicController.SubmitClaim(Context.User, claims, actual);

                        if(successful) {
                            foreach(var gameUser in gameLobby.Players) {
                                var gameState = gameLobby.GameLogicController.GetGameState(gameUser);
                                var connections = userConnectionService.GetConnections(gameUser);

                                foreach(var connection in connections) {
                                        Clients.Client(connection).InvokeAsync(
                                            "GameClaim",
                                            new object[] {
                                                gameState
                                            });
                                    }
                            }
                        }
                    }
                }
            });
        }

        public Task GameEndTurn(string gameLobbyID) {
            return Task.Run(() => {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

                if(gameLobby.HasUser(Context.User)) {
                    if(gameLobby.GameLogicController.IsCurrentTurn(Context.User)) {
                        if(gameLobby.GameLogicController.IsVictory()) {
                            Console.WriteLine("Victory!");
                        }
                        else {
                            gameLobby.GameLogicController.EndTurn();

                            foreach(var user in gameLobby.Players) {
                                var connections = userConnectionService.GetConnections(user);
                                var gameState = gameLobby.GameLogicController.GetGameState(user);

                                foreach(var connection in connections) {
                                    Clients.Client(connection).InvokeAsync(
                                        "GameEndTurn", 
                                        new object[] {
                                            gameState
                                        });
                                }
                            }
                        }                        
                    }
                }
            });
        }

        public Task GameState(string gameLobbyID) {
            return Task.Run(() => {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

                if(gameLobby.HasUser(Context.User)) {
                    GameState gameState = gameLobby.GameLogicController.GetGameState(Context.User);

                    var connections = userConnectionService.GetConnections(Context.User);
                    foreach(var connection in connections) {
                                Clients.Client(connection).InvokeAsync(
                                    "GameState", 
                                    new object[] {
                                        gameState
                                    });
                            }
                }            
            });
        }

        public Task GameLobbyStartGame(string gameLobbyID) {
            return Task.Run(() => {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
                if(gameLobby.HasUser(Context.User)) {
                    gameLobby.StartGame();

                    foreach(var user in gameLobby.Players) {
                        GameUserEntity gameUser = gameLobby.GameLogicController.GetPlayer(user);
                    
                        var connections = userConnectionService.GetConnections(user);
                            foreach(var connection in connections) {
                                Console.WriteLine("Lobby Joined");
                                bool currentTurn = false;

                                if(gameLobby.GameLogicController.CurrentTurn(gameUser)) {
                                    currentTurn = true;
                                }

                                Clients.Client(connection).InvokeAsync(
                                    "GameLobbyStartGame", 
                                    new object[] {
                                        currentTurn
                                    });
                            }
                    }
                }
            });
        }

        public Task GameLobbyLeave() {
            return Task.Run(() => {
                
            });
        }

        public Task GameLobbyJoin(string gameLobbyID) {
            return Task.Run(() => {
                Console.WriteLine("here" + gameLobbyID);
                var userConnections = userConnectionService.GetConnections(Context.User);
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
                var newUser = new { userName = Context.User.GetUserName()};

                if(gameLobby.GameLobbyType==GameLobby.LobbyType.Public) {
                    if(gameLobby.GetUsersCount()>=gameLobby.MaxRoomLimit) {
                        foreach(var userConnection in userConnections) {
                            Console.WriteLine("Lobby Full");
                            Clients.Client(userConnection).InvokeAsync("GameLobbyJoin", new object[] {false, null, null, newUser, false, ""});
                        }
                        return;
                    }
                    if(gameLobby.InGame()) {
                        foreach(var userConnection in userConnections) {
                            Console.WriteLine("Game in progress");
                            Clients.Client(userConnection).InvokeAsync("GameLobbyJoin", new object[] {false, null, null, newUser, false, ""});
                        }
                        return;
                    }
                    else {
                        if(!gameLobby.HasUser(Context.User)) {
                            gameLobby.AddUser(Context.User);    
                        }
                        
                        var host = new { userName = gameLobby.Hosts[0].GetUserName()};
                        var players = gameLobby.Players
                        .Select((item) => new {userName = item.GetUserName()})
                        .ToList();

                        foreach(var user in gameLobby.GetUsers()) {
                            Console.WriteLine(user.GetUserName());
                            bool isNewUser = false;
                            if(user.GetUserName() == Context.User.GetUserName()) {
                                isNewUser = true;
                            }

                            var connections = userConnectionService.GetConnections(user);
                            foreach(var connection in connections) {
                                Console.WriteLine("Lobby Joined");
                                Clients.Client(connection).InvokeAsync(
                                    "GameLobbyJoin", 
                                    new object[] {
                                        true, host, players, newUser, isNewUser, gameLobbyID
                                    });
                            }
                        }
                    }
                }
            });
        }

        public Task GameLobbySendMessage(string message, string gameLobbyID) {
            return Task.Run(() => 
            {
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);
                Console.WriteLine(gameLobbyID);
                if(gameLobby.HasUser(Context.User)) {
                    Console.WriteLine(message);
                    ChatMessage chatMessage = new ChatMessage {
                        UserID = Context.User.GetUserLoginID(),
                        UserName = Context.User.GetUserName(),
                        MessageContent = message,
                        WhenCreated = DateTime.Now
                    };

                    foreach(var participant in gameLobby.GetUsers()) {
                        var isSender = false;
                        if(participant.GetUserLoginID() == Context.User.GetUserLoginID()) {
                            isSender = true;
                        }

                        var connections = userConnectionService.GetConnections(participant);
                        foreach(var connection in connections) {
                            Console.WriteLine("Im sending");
                            Clients.Client(connection).InvokeAsync(
                                "GameLobbySendMessage", 
                                new object[] {
                                    chatMessage,
                                    isSender
                                });
                        }
                    }
                }
            });
        }

        public override Task OnConnectedAsync() {
            userConnectionService.Add(Context.User, Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            userConnectionService.Remove(Context.User, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}