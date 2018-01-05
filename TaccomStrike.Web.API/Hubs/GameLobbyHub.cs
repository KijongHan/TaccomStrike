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

        public Task GameLobbyStartGame(string gameLobbyID) {
            return Task.Run(() => {
                
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
                    if(gameLobby.GetUsersCount()==gameLobby.MaxRoomLimit) {
                        foreach(var userConnection in userConnections) {
                            Console.WriteLine("Lobby Full");
                            Clients.Client(userConnection).InvokeAsync("GameLobbyJoin", new object[] {false, null, null, newUser, false, ""});
                        }
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