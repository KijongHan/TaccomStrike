function GameLobbyViewModel(connection, data) {
    var self = this;
    
    self.connection = connection;
    self.gameLobbyMessage = ko.observable(null);
    self.gameLobbyID = ko.observable(null);
    self.gameLobbyName = ko.observable(null);
    self.hostUserName = ko.observable(null);
    self.maxRoomLimit = ko.observable(null);
    self.host = ko.observable(null);
    self.players = ko.observableArray();
    self.gameLobbyMessages = ko.observableArray();

    if(data != null) {
        self.gameLobbyID(data.gameLobbyID);
        self.gameLobbyName(data.gameLobbyName);
        self.hostUserName(data.hostUserName);
        self.maxRoomLimit(data.maxRoomLimit);
    }

    self.startGame = function() {
        self.connection.invoke("GameLobbyStartGame", self.gameLobbyID());
    }

    self.leaveGameLobby = function() {
        self.connection.invoke("GameLobbyLeave", self.gameLobbyID());
    }

    self.joinGameLobby = function() {
        self.connection.invoke("GameLobbyJoin", self.gameLobbyID());
    }

    self.sendMessageGameLobby = function() {
        self.connection.invoke("GameLobbySendMessage", self.gameLobbyMessage(), self.gameLobbyID());
    }

    self.createGameLobby = function() {
        fetch("http://localhost:50249/api/gamelobbies", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                gameLobbyName: self.gameLobbyName(),
                maxRoomLimit: self.maxRoomLimit(),
            }),
        }).then(response => {
            response.json().then(function(data) {
                console.log(data);
                self.connection.invoke("GameLobbyJoin", data.gameLobbyID);
            });
        });
    }
}