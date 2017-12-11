using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;

namespace TaccomStrike.Web.API.Hubs {

    public class ChatHub : Hub {

        private GameUserConnectionService gameUserConnectionService;

        public ChatHub(GameUserConnectionService gameUserConnectionService) {
            this.gameUserConnectionService = gameUserConnectionService;
        }

        public override Task OnConnectedAsync() {
            int userID = Context.User.GetUserID();
            gameUserConnectionService.Add(userID, Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            int userID = Context.User.GetUserID();
            gameUserConnectionService.Remove(userID, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}