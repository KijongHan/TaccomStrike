using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using CallCheatOnline.Game.CallCheat;
using CallCheatOnline.Library.Data.ApiEntities;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Library.Data.Utility
{
	public static class ApiEntitiesExtensions
	{
		public static List<GetChatRoom> ApiChatRooms(this IEnumerable<ChatRoom> chatRooms)
		{
			return chatRooms
				.Select((item) =>
				{
					return item.ApiChatRoom();
				})
				.ToList();
		}

		public static GetChatRoom ApiChatRoom(this ChatRoom chatRoom)
		{
			return new GetChatRoom
			{
				ChatRoomName = chatRoom.ChatRoomName,
				Participants = chatRoom
						.GetParticipants()
						.ApiGetUsers()
			};
		}

		public static List<GetUser> ApiGetUsers(this IEnumerable<ClaimsPrincipal> users)
		{
			return users
				.Select((user) =>
				{
					return new GetUser
					{
						UserID = user.GetUserLoginID(),
						Username = user.GetUserName()
					};
				})
				.ToList();
		}

		public static List<GetUser> ApiGetUsers(this IEnumerable<UserLogin> users)
		{
			return users
				.Select((user) =>
				{
					return new GetUser
					{
						UserID = user.UserLoginID,
						Username = user.Username
					};
				})
				.ToList();
		}

		public static List<GetUser> ApiGetUsers(this IEnumerable<GuestLogin> users)
		{
			return users
				.Select((guest) =>
				{
					return new GetUser
					{
						UserID = guest.GuestLoginID,
						Username = guest.GuestName
					};
				})
				.ToList();
		}

		public static GetUser ApiGetUser(this ClaimsPrincipal principal)
		{
			if(principal == null)
			{
				return null;
			}
			return new GetUser
			{
				UserID = principal.GetUserLoginID(),
				Username = principal.GetUserName()
			};
		}

		public static GetUser ApiGetUser(this UserLogin userLogin)
		{
			if (userLogin == null)
			{
				return null;
			}
			return new GetUser
			{
				UserID = userLogin.UserLoginID,
				Username = userLogin.Username
			};
		}

		public static GetGameLobby ApiGetGameLobby(this GameLobby gameLobby)
		{
			return new GetGameLobby
			{
				Host = gameLobby.GetHost().ApiGetUser(),
				Players = gameLobby.GetUsers().ApiGetUsers(),
				MaxRoomLimit = gameLobby.MaxRoomLimit,
				GameLobbyName = gameLobby.GameLobbyName,
				GameLobbyID = gameLobby.GameLobbyID,
				GameMode = gameLobby.GameMode
			};
		}

		public static List<GetGameLobby> ApiGetGameLobbies(this IEnumerable<GameLobby> gameLobbies)
		{
			return gameLobbies
				.Select((gameLobby) =>
				{
					return gameLobby.ApiGetGameLobby();
				})
				.ToList();
		}

		public static GetChatMessage ApiGetChatMessage(this ChatMessage chatMessage)
		{
			return new GetChatMessage
			{
				User = chatMessage.User.ApiGetUser(),
				Message = chatMessage.Message,
				WhenCreated = chatMessage.WhenCreated
			};
		}

		public static List<GetGameCard> ApiGetGameCard(this IEnumerable<GameCard> gameCards)
		{
			return gameCards
				.Select((gameCard) =>
				{
					return new GetGameCard(gameCard);
				})
				.ToList();
		}

		public static List<GetGameCard> ApiGetGameCard(this SortedList<GameCard, GameCard> gameCards)
		{
			return gameCards
				.Select((gameCard) =>
				{
					return new GetGameCard(gameCard.Value);
				})
				.ToList();
		}

		public static List<GetGameUser> ApiGetGameUsers(this IEnumerable<Game.CallCheat.GameUser> gameUsers)
		{
			return gameUsers
				.Select((gameUser) =>
				{
					return new GetGameUser(gameUser);
				})
				.ToList();
		}

		public static List<GetGameClaim> ApiGetGameClaims(this IEnumerable<GameClaim> claims)
		{
			return claims
				.Select((claim) =>
				{
					return new GetGameClaim(claim);
				})
				.ToList();
		}
	}
}
