function ChatMessage(data) {
    var self = this;

    self.userName = data.UserName;
    self.userID = data.UserID;
    self.messageContent = data.MessageContent;
    self.whenCreated = data.WhenCreated;
    console.log(this);

    self.userNameInfo = ko.computed(function() {
        return self.userName + ": "
    });
}