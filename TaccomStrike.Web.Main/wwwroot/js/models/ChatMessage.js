function ChatMessage(data) {
    var self = this;

    self.userName = data.userName;
    self.userID = data.userID;
    self.messageContent = data.messageContent;
    self.whenCreated = data.whenCreated;
    console.log(this);

    self.userNameInfo = ko.computed(function() {
        return self.userName + ": "
    });
}