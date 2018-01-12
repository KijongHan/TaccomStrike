using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.Hubs {

    public class ChatHub : Hub {

        private ChatRoomService chatRoomService;
        private UserConnectionService userConnectionService;

        public ChatHub(UserConnectionService userConnectionService, ChatRoomService chatRoomService) {
            this.userConnectionService = userConnectionService;
            this.chatRoomService = chatRoomService;
        }

        public Task ChatUserSendMessage(string message, int recipientUserID) {
            return Task.Run(() => {
                ChatMessage chatMessage = new ChatMessage {
                        UserID = Context.User.GetUserLoginID(),
                        UserName = Context.User.GetUserName(),
                        MessageContent = message,
                        WhenCreated = DateTime.Now
                    };
                
                var connections = userConnectionService.GetConnections(recipientUserID);
                        foreach(var connection in connections) {
                            Console.WriteLine("Im sending");
                            Clients.Client(connection).InvokeAsync(
                                "ChatUserSendMessage",
                                new object[] {
                                    chatMessage
                                });
                        }
                
                connections = userConnectionService.GetConnections(Context.User);
                        foreach(var connection in connections) {
                            Console.WriteLine("Im sending");
                            Clients.Client(connection).InvokeAsync(
                                "ChatUserSendMessage",
                                new object[] {
                                    chatMessage
                                });
                        }
            });
        }

        public Task ChatSendMessage(string message, string chatRoomName) {
            return Task.Run(() => 
            {
                Console.WriteLine(Context.User.GetUserName());
                var chatRoom = chatRoomService.GetChatRoom(chatRoomName);
                if(chatRoom.HasParticipant(Context.User)) {
                    Console.WriteLine(message);
                    ChatMessage chatMessage = new ChatMessage {
                        UserID = Context.User.GetUserLoginID(),
                        UserName = Context.User.GetUserName(),
                        MessageContent = message,
                        WhenCreated = DateTime.Now
                    };

                    chatRoom.AddChatMessage(message, Context.User);

                    foreach(var participant in chatRoom.GetParticipants()) {
                        var isSender = false;
                        if(participant.GetUserLoginID() == Context.User.GetUserLoginID()) {
                            isSender = true;
                        }

                        var connections = userConnectionService.GetConnections(participant);
                        foreach(var connection in connections) {
                            Console.WriteLine("Im sending");
                            Clients.Client(connection).InvokeAsync(
                                "ChatSendMessage",
                                new object[] {
                                    chatMessage,
                                    isSender,
                                    chatRoomName
                                });
                        }
                    }
                }
            });
        }

        public Task ChatRoomJoin(string chatRoomName) {
            return Task.Run(() => 
            {
                var chatRoom = chatRoomService.GetChatRoom(chatRoomName);
                if(chatRoom == null) {
                    return;
                }

                if(chatRoom.RoomType == ChatRoom.Type.Public) {
                    chatRoom.AddParticipant(Context.User);
                    var participants = chatRoom.GetParticipants();

                    foreach(var participant in participants) {
                        var isNewChatUser = false;

                        if(participant.GetUserLoginID() == Context.User.GetUserLoginID()) {
                            isNewChatUser = true;
                        }

                        var connections = userConnectionService.GetConnections(participant);
                        foreach(var connection in connections) {
                            Clients.Client(connection).InvokeAsync(
                                "ChatRoomJoin", 
                                new object[] {
                                    new {
                                        UserName = Context.User.GetUserName()
                                    },
                                    participants.Select(item => new { 
                                        UserName = item.GetUserName()
                                    }),
                                    isNewChatUser,
                                    chatRoomName
                                });
                        }
                    }
                }       
            });
        }

        public override Task OnConnectedAsync() {
            return Task.Run(() => 
            {
                Console.WriteLine("From ChatHub" + Context.Connection.GetHttpContext().Request.Cookies.Count);
                Console.WriteLine("From ChatHub" + Context.User.GetUserName());
                userConnectionService.Add(Context.User, Context.ConnectionId);
                chatRoomService.GetGeneralChatRoom().AddParticipant(Context.User);
                return base.OnConnectedAsync();
            });
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            return Task.Run(() => 
            {
                userConnectionService.Remove(Context.User, Context.ConnectionId);
                foreach(var chatRoom in chatRoomService.GetChatRooms()) {
                    if(chatRoom.HasParticipant(Context.User)) {
                        chatRoom.RemoveParticipant(Context.User);

                        foreach(var participant in chatRoom.GetParticipants()) {
                            var connections = userConnectionService.GetConnections(participant);
                            foreach(var connection in connections) {
                                Console.WriteLine("Im sending");
                                Clients.Client(connection).InvokeAsync
                                (
                                    "ChatUserDisconnected", 
                                    new object[] { 
                                        new { 
                                            UserName = Context.User.GetUserName() 
                                        },
                                        chatRoom.ChatRoomName
                                    }
                                );
                            }
                        }
                    }
                }
                return base.OnDisconnectedAsync(exception);
            });
        }
    }
}