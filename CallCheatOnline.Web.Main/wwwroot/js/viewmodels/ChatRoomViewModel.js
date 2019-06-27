function ChatRoomViewModel(chatRoomsViewModel, connection, data) {
    var self = this;

    self.chatRoomsViewModel = chatRoomsViewModel;
    self.connection = connection;
    
    self.chatRoomName = ko.observable();
    self.chatMessageInput = ko.observable();
    self.chatMessages = ko.observableArray();
    self.users = ko.observableArray(data.participants);
    self.inChat = ko.observable(false);

    self.usersCount = ko.computed(function() {
        return self.users().length + " Users";
    });

    self.chatRoomName(data.chatRoomName);
    console.log(self.chatRoomName() + " " + data);

    self.sendMessage = function() {
        var message = self.chatMessageInput();
        self.chatMessageInput("");
        self.connection.invoke("ChatSendMessage", message, self.chatRoomName());
    }

    self.joinChatRoom = function() {
        self.connection.invoke('ChatRoomJoin', self.chatRoomName());
    }

    self.selectChatRoom = function() {
        chatRoomsViewModel.selectChatRoom(self);
    }

    self.onKeyDown = function(d, e) {
        if(e.keyCode===13) {
            self.sendMessage();
        }
        return true;
    }
}