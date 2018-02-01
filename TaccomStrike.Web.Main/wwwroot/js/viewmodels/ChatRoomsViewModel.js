function ChatRoomsViewModel(connection) {
    var self = this;

    self.connection = connection;
    self.chatRooms = ko.observableArray();
    self.onlineUsers = ko.observableArray();
    self.selectedChatRoom = ko.observable();

    self.onlineUsersCount = ko.computed(function() {
        return self.onlineUsers().length + " Players Online";
    });

    self.getChatRooms = function() {
        self.chatRooms.removeAll();
        fetch("http://localhost:50249/api/chatrooms", {
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
            self.selectedChatRoom(null);
        }
        else {
            activateCurrentChatRoomCard();
            self.selectedChatRoom(chatRoom);
        }
        
    }
}