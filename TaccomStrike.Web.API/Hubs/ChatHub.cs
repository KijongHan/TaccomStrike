using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Web.API.Hubs {

    public class ChatHub : Hub {

        private ChatRoomService chatRoomService;
        private UserConnectionService userConnectionService;

        public ChatHub(UserConnectionService userConnectionService, ChatRoomService chatRoomService) {
            this.userConnectionService = userConnectionService;
            this.chatRoomService = chatRoomService;
        }

        public Task Send(string message, string chatRoomName) {
            return Task.Run(() => 
            {
                var chatRoom = chatRoomService.GetChatRoom(chatRoomName);
                if(chatRoom.HasParticipant(Context.User)) {
                    foreach(var participant in chatRoom.GetParticipants()) {
                        var connections = userConnectionService.GetConnections(participant.GetUserLoginID());
                        foreach(var connection in connections) {
                            Clients.Client(connection).InvokeAsync("Send", new object[] {message, Context.User});
                        }
                    }
                }
            });
        }

        public override Task OnConnectedAsync() {
            return Task.Run(() => 
            {
                Console.WriteLine("From ChatHub" + Context.Connection.GetHttpContext().Request.Cookies.Count);
                int userID = Context.User.GetUserLoginID();
                Console.WriteLine("From ChatHub" + Context.User.GetUserName());
                userConnectionService.Add(userID, Context.ConnectionId);
                chatRoomService.GetGeneralChatRoom().AddParticipant(Context.User);
                return base.OnConnectedAsync();
            });
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            return Task.Run(() => 
            {
                int userID = Context.User.GetUserLoginID();
                userConnectionService.Remove(userID, Context.ConnectionId);
                foreach(var chatRoom in chatRoomService.GetChatRooms()) {
                    chatRoom.RemoveParticipant(Context.User);
                }
                return base.OnDisconnectedAsync(exception);
            });
        }
    }
}