function ChatRoomViewModel(connection, data) {
    var self = this;

    self.connection = connection;
    self.chatRoomName = ko.observable();
    self.chatMessageInput = ko.observable();
    self.chatMessages = ko.observableArray();
    self.users = ko.observableArray();

    self.chatRoomName(data.chatRoomName);
    console.log(self.chatRoomName() + " " + data);

    self.sendMessage = function() {
        var message = self.chatMessageInput();
        self.connection.invoke("ChatSendMessage", message, self.chatRoomName());
    }

    self.joinChatRoom = function() {
        self.connection.invoke('ChatRoomJoin', self.chatRoomName());
    }
}