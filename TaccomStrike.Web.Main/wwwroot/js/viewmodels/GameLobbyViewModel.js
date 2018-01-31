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
    self.userCount = ko.observable(null);

    self.hand = ko.observableArray();
    self.rankClaim = ko.observable();
    console.log(data);

    self.maxRoomLimitOptions = ko.observableArray([2, 3, 4, 5, 6, 7, 8]);

    self.userCountLimitFraction = ko.computed(function() {
        return self.userCount() + "/" + self.maxRoomLimit();
    });

    self.hostInfo = ko.computed(function() {
        return "Created By: " + self.hostUserName();
    });

    if(data != null) {
        self.gameLobbyID(data.gameLobbyID);
        self.gameLobbyName(data.gameLobbyName);
        self.hostUserName(data.hostUserName);
        self.userCount(data.userCount);
        self.maxRoomLimit(data.maxRoomLimit);
        console.log("From game lobby viewmodel" + data.gameLobbyID + data.gameLobbyName);
    }

    self.gameState = function() {
        self.connection.invoke("GameState", self.gameLobbyID());
    }

    self.startGame = function() {
        self.connection.invoke("GameLobbyStartGame", self.gameLobbyID());
    }

    self.gameCallCheat = function() {
        self.connection.invoke("GameCallCheat", self.gameLobbyID());
    }

    self.gameEndTurn = function() {
        self.connection.invoke("GameEndTurn", self.gameLobbyID());
    }

    self.gameClaim = function() {
        var selectedCards = [];
        for(var i = 0; i < self.hand().length; i++) {
            if(self.hand()[i].selected()) {
                var card = { 
                    "Rank": self.hand()[i].rank(),
                    "Suit": self.hand()[i].suit()
                };
                selectedCards.push(card);
            }
        }
        var claims = [];
        for(var j = 0; j < selectedCards.length; j++) {
            var claim = { "Rank": self.rankClaim() };
            claims.push(claim);
        }
        self.connection.invoke("GameClaim", self.gameLobbyID(), claims, selectedCards);
    }

    self.leaveGameLobby = function() {
        self.connection.invoke("GameLobbyLeave", self.gameLobbyID());
    }

    self.joinGameLobby = function() {
        self.connection.invoke("GameLobbyJoin", self.gameLobbyID());
    }

    self.sendMessageGameLobby = function() {
        self.connection.invoke("GameLobbySendMessage", self.gameLobbyMessage(), self.gameLobbyID());
        self.gameLobbyMessage(null);
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