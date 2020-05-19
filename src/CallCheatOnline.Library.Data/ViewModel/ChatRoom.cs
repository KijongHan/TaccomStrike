using System;
using System.Security.Claims;
using System.Collections.Generic;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Library.Data.ViewModel
{
	public class ChatRoom
	{
		public enum Type
		{
			Public, Private
		}

		public ChatRoom.Type RoomType {get;set;}

		public string ChatRoomName {get;set;}

		private Dictionary<int, ClaimsPrincipal> participants;

		private List<ChatMessage> chatMessgages;

		public ChatRoom(string chatRoomName, ChatRoom.Type roomType)
		{
			participants = new Dictionary<int, ClaimsPrincipal>();
			chatMessgages = new List<ChatMessage>();
			RoomType = roomType;
			ChatRoomName = chatRoomName;
		}

		public List<ClaimsPrincipal> GetParticipants()
		{
			List<ClaimsPrincipal> participantsList = new List<ClaimsPrincipal>();
			foreach(var participant in participants.Values)
			{
				participantsList.Add(participant);
			}
			return participantsList;
		}

		public bool HasParticipant(ClaimsPrincipal user)
		{
			if(participants.ContainsKey(user.GetUserLoginID()))
			{
				return true;
			}
			return false;
		}

		public bool AddParticipant(ClaimsPrincipal user)
		{
			if(!participants.ContainsKey(user.GetUserLoginID()))
			{
				participants.Add(user.GetUserLoginID(), user);
				return true;
			}
			return false;
		}

		public bool RemoveParticipant(ClaimsPrincipal user)
		{
			if(participants.ContainsKey(user.GetUserLoginID()))
			{
				participants.Remove(user.GetUserLoginID());
				return true;
			}
			return false;
		}

		public void AddChatMessage(string message, ClaimsPrincipal user)
		{
			var userID = user.GetUserLoginID();
			var chatMessage = new ChatMessage
			{
				User = user,
				Message = message,
				WhenCreated = DateTime.UtcNow
			};
			chatMessgages.Add(chatMessage);
		}

		public void AddChatMessage(ChatMessage chatMessage)
		{
			chatMessgages.Add(chatMessage);
		}

		public List<ChatMessage> GetChatMessages()
		{
			return chatMessgages;
		}
	}
}
