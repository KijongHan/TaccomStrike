using System;
using System.Security.Claims;
using System.Collections.Generic;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.ViewModel {
    public class ChatRoom {

        public enum Type {
            Public, Private
        }

        public ChatRoom.Type RoomType {get;set;}

        public string ChatRoomName {get;set;}
        private Dictionary<int, ClaimsPrincipal> Participants;

        private List<ChatMessage> chatMessgages;

        public ChatRoom(string chatRoomName, ChatRoom.Type roomType) {
            Participants = new Dictionary<int, ClaimsPrincipal>();
            chatMessgages = new List<ChatMessage>();
            RoomType = roomType;
            ChatRoomName = chatRoomName;
        }

        public List<ClaimsPrincipal> GetParticipants() {
            List<ClaimsPrincipal> participantsList = new List<ClaimsPrincipal>();
            foreach(var participant in Participants.Values) {
                participantsList.Add(participant);
            }
            return participantsList;
        }

        public bool HasParticipant(ClaimsPrincipal user) {
            if(Participants.ContainsKey(user.GetUserLoginID())) {
                return true;
            }
            return false;
        }

        public bool AddParticipant(ClaimsPrincipal user) {
            if(!Participants.ContainsKey(user.GetUserLoginID())) {
                Participants.Add(user.GetUserLoginID(), user);
                return true;
            }
            return false;
        }

        public bool RemoveParticipant(ClaimsPrincipal user) {
            if(Participants.ContainsKey(user.GetUserLoginID())) {
                Participants.Remove(user.GetUserLoginID());
                return true;
            }
            return false;
        }

        public void AddChatMessage(string message, ClaimsPrincipal user) {
            var userID = user.GetUserLoginID();
            var chatMessage = new ChatMessage { UserID = userID, MessageContent = message, WhenCreated = DateTime.Now };
            chatMessgages.Add(chatMessage);
        }

        public void AddChatMessage(ChatMessage chatMessage) {
            chatMessgages.Add(chatMessage);
        }

        public List<ChatMessage> GetChatMessages() {
            return chatMessgages;
        }
    }
}
