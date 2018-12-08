using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Web.API.HubApi;

namespace TaccomStrike.Web.API
{
	public static class HubConnectionExtensions
	{
		public static Task ChatUserSendMessage(this IClientProxy hubConnection, ChatUserSendMessage apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatUserSendMessage, apiObject);
		}

		public static Task ChatRoomSendMessage(this IClientProxy hubConnection, ChatRoomSendMessage apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatRoomSendMessage, apiObject);
		}

		public static Task ChatRoomJoin(this IClientProxy hubConnection, ChatRoomJoin apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatRoomJoin, apiObject);
		}

		public static Task ChatRoomLeave(this IClientProxy hubConnection, ChatRoomLeave apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatRoomLeave, apiObject);
		}

		public static Task ChatUserConnected(this IClientProxy hubConnection, ChatUserConnected apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatUserConnected, apiObject);
		}

		public static Task ChatUserDisconnected(this IClientProxy hubConnection, ChatUserDisconnected apiObject)
		{
			return hubConnection.SendAsync(ChatHubApiKeys.ChatUserDisconnected, apiObject);
		}

		public static Task GameCallCheat(this IClientProxy hubConnection, GameCallCheat apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameCallCheat, apiObject);
		}

		public static Task GameClaim(this IClientProxy hubConnection, GameClaim apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameClaim, apiObject);
		}

		public static Task GameEndTurn(this IClientProxy hubConnection, GameEndTurn apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameEndTurn, apiObject);
		}

		public static Task GameLobbyStartGame(this IClientProxy hubConnection, GameLobbyStartGame apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameLobbyStartGame, apiObject);
		}

		public static Task GameLobbyLeaveGame(this IClientProxy hubConnection, GameLobbyLeaveGame apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameLobbyLeaveGame, apiObject);
		}

		public static Task GameLobbyJoin(this IClientProxy hubConnection, GameLobbyJoin apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameLobbyJoin, apiObject);
		}

		public static Task GameLobbySendMessage(this IClientProxy hubConnection, GameLobbySendMessage apiObject)
		{
			return hubConnection.SendAsync(GameHubApiKeys.GameLobbySendMessage, apiObject);
		}
	}
}
