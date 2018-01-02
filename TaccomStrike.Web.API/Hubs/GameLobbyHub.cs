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

        public Task GameLobbyStartGame() {
            return Task.Run(() => {
                
            });
        }

        public Task GameLobbyLeave() {
            return Task.Run(() => {
                
            });
        }

        public Task GameLobbyJoin(string gameLobbyID, string gameLobbyPassword) {
            return Task.Run(() => {
                var userConnections = userConnectionService.GetConnections(Context.User);
                var gameLobby = gameLobbyService.GetGameLobby(gameLobbyID);

                if(gameLobby.GameLobbyType==GameLobby.LobbyType.Public) {
                    if(gameLobby.GetUsersCount()==gameLobby.MaxRoomLimit) {
                        foreach(var userConnection in userConnections) {
                            Clients.Client(userConnection).InvokeAsync("GameLobbyJoin", new object[] {false, null, null, null});
                        }
                    }
                    else {
                        gameLobby.AddUser(Context.User);
                        var host = new { UserName = gameLobby.Host.GetUserName()};
                        var players = gameLobby.Players
                        .Select((item) => new {UserName = item.GetUserName()})
                        .ToList();
                        var spectators = gameLobby.Spectators
                        .Select((item) => new {UserName = item.GetUserName()})
                        .ToList();

                        foreach(var user in gameLobby.GetUsers()) {
                            var connections = userConnectionService.GetConnections(user);
                            foreach(var connection in connections) {
                                Clients.Client(connection).InvokeAsync(
                                    "GameLobbyJoin", 
                                    new object[] {
                                        true, host, players, spectators
                                    });
                            }
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