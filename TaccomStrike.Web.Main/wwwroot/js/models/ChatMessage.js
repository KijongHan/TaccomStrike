function ChatMessage(data) {
    this.userName = data.UserName;
    this.userID = data.UserID;
    this.messageContent = data.MessageContent;
    this.whenCreated = data.WhenCreated;
    console.log(this);
}