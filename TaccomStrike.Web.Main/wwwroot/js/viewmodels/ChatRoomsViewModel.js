function ChatRoomsViewModel(connection) {
    var self = this;

    self.connection = connection;
    self.chatRooms = ko.observableArray();
    self.onlineUsers = ko.observableArray();
    self.selectedChatRoom = ko.observable(new ChatRoomViewModel(self, connection, {"chatRoomName": "", "participants": []}));

    self.onlineUsersCount = ko.computed(function() {
        return self.onlineUsers().length + " Players Online";
    });

    self.hasChat = ko.computed(function() {
        if(self.chatRooms().length>0) {
            return "inline";
        }
        else {
            return "none";
        }
    });

    self.getChatRooms = function() {
        self.chatRooms.removeAll();
        fetch("http://174.138.15.215:81/api/chatrooms", {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            response.json().then(function(data) {
                console.log(data);
                data.forEach(function(element) {
                    self.chatRooms.push(new ChatRoomViewModel(self, connection, element));
                });
            });
        })
    }

    self.selectChatRoom = function(chatRoom) {
        if(self.selectedChatRoom() == chatRoom) {
            deactivateCurrentChatRoomCard();
            self.selectedChatRoom(new ChatRoomViewModel(self, connection, {"chatRoomName": "", "participants": []}));
        }
        else {
            activateCurrentChatRoomCard();
            self.selectedChatRoom(chatRoom);
        }
        
    }
}