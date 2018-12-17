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

namespace TaccomStrike.Web.API.Hubs {

	public class ChatHub : Hub
	{
		private ChatRoomService chatRoomService;
		private UserConnectionsService userConnectionsService;

		public ChatHub(UserConnectionsService userConnectionsService, ChatRoomService chatRoomService)
		{
			this.userConnectionsService = userConnectionsService;
			this.chatRoomService = chatRoomService;
		}

		public Task ChatUserSendMessage(string message, int recipientUserID)
		{
			return Task.Run(() =>
			{
				ChatMessage chatMessage = new ChatMessage
				{
					User = Context.User,
					Message = message,
					WhenCreated = DateTime.Now
				};
				var apiObject = new ChatUserSendMessage
				{
					ChatMessage = chatMessage.ApiGetChatMessage()
				};

				var connection = userConnectionsService.ChatConnectionService.GetConnection(recipientUserID);
				Clients.Client(connection).ChatUserSendMessage(apiObject);

				connection = userConnectionsService.ChatConnectionService.GetConnection(Context.User);
				Clients.Client(connection).ChatUserSendMessage(apiObject);
			});
		}

		public Task ChatRoomSendMessage(string message, string chatRoomName)
		{
			return Task.Run(() => 
			{
				var chatRoom = chatRoomService.GetChatRoom(chatRoomName);
				if(chatRoom.HasParticipant(Context.User))
				{
					ChatMessage chatMessage = new ChatMessage
					{
						User = Context.User,
						Message = message,
						WhenCreated = DateTime.Now
					};
					chatRoom.AddChatMessage(chatMessage);

					var apiObject = new ChatRoomSendMessage
					{
						ChatMessage = chatMessage.ApiGetChatMessage(),
						ChatRoomName = chatRoomName
					};
					foreach(var participant in chatRoom.GetParticipants())
					{
						var connection = userConnectionsService.ChatConnectionService.GetConnection(participant);
						Clients.Client(connection).ChatRoomSendMessage(apiObject);
					}
				}
			});
		}

		public Task ChatRoomJoin(string chatRoomName)
		{
			return Task.Run(() => 
			{
				var chatRoom = chatRoomService.GetChatRoom(chatRoomName);
				if(chatRoom == null)
				{
					return;
				}

				if(chatRoom.HasParticipant(Context.User))
				{
					return;
				}

				if(chatRoom.RoomType == ChatRoom.Type.Public)
				{
					chatRoom.AddParticipant(Context.User);
					var apiObject = new ChatRoomJoin
					{
						ChatRoom = chatRoom.ApiChatRoom(),
						NewUser = Context.User.ApiGetUser()
					};

					foreach(var participant in chatRoom.GetParticipants())
					{
						var connection = userConnectionsService.ChatConnectionService.GetConnection(participant);
						Clients.Client(connection).ChatRoomJoin(apiObject);
					}
				}
			});
		}

		public override Task OnConnectedAsync()
		{
			lock(userConnectionsService.ChatConnectionService.ConnectionLock)
			{
				return Task.Run(() =>  
				{
					userConnectionsService.ChatConnectionService.Add(Context.User, Context.ConnectionId);
					var apiObject = new ChatUserConnected
					{
						NewUser = Context.User.ApiGetUser(),
						ConnectedUsers = userConnectionsService
							.ChatConnectionService
							.GetUsers()
							.ApiGetUsers()
					};

					foreach(var connection in userConnectionsService.ChatConnectionService.GetUserConnections())
					{
						Clients.Client(connection).ChatUserConnected(apiObject);
					}
					return base.OnConnectedAsync();
				});
			}
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			lock(userConnectionsService.ChatConnectionService.ConnectionLock)
			{
				return Task.Run(() => 
				{
					userConnectionsService.ChatConnectionService.Remove(Context.User, Context.ConnectionId);

					foreach(var chatRoom in chatRoomService.GetChatRooms())
					{
						if(chatRoom.HasParticipant(Context.User))
						{
							var apiObject = new ChatRoomLeave
							{
								LeavingUser = Context.User.ApiGetUser(),
								ChatRoom = chatRoom.ApiChatRoom()
							};

							chatRoom.RemoveParticipant(Context.User);
							foreach(var participant in chatRoom.GetParticipants())
							{
								var connection = userConnectionsService.ChatConnectionService.GetConnection(participant);
								if(connection == null)
								{
									continue;
								}

								Clients.Client(connection).ChatRoomLeave(apiObject);
							}
						}
					}

					var disconnectedUserApiObject = new ChatUserDisconnected
					{
						DisconnectedUser = Context.User.ApiGetUser()
					};

					foreach (var connection in userConnectionsService.ChatConnectionService.GetUserConnections())
					{
						Clients.Client(connection).ChatUserDisconnected(disconnectedUserApiObject);
					}
					return base.OnDisconnectedAsync(exception);
				});
			}
		}
	}
}