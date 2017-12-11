using System.Collections.Generic;
using System.Linq;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.Services {

    public class ChatRoomService {

        private List<ChatRoom> chatRooms;

        public ChatRoomService() {
            chatRooms = new List<ChatRoom>();
            chatRooms.Add(new ChatRoom("General Chat", ChatRoom.Type.Public));
        }

        public ChatRoom GetGeneralChatRoom() {
            return GetChatRoom("General Chat");
        }

        public ChatRoom GetChatRoom(string chatRoomName) {
            ChatRoom chatRoom = chatRooms
            .Where((item) => item.ChatRoomName == chatRoomName)
            .FirstOrDefault();
            return chatRoom;
        }

        public List<ChatRoom> GetChatRooms() {
            return chatRooms;
        }
    }
}