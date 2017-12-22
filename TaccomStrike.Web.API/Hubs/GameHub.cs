using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Web.API.Hubs {

    public class GameHub : Hub {

        private UserConnectionService userConnectionService;

        public GameHub(UserConnectionService userConnectionService) {
            this.userConnectionService = userConnectionService;
        }

        public override Task OnConnectedAsync() {
            int userID = Context.User.GetUserLoginID();
            userConnectionService.Add(userID, Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            int userID = Context.User.GetUserLoginID();
            userConnectionService.Remove(userID, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}