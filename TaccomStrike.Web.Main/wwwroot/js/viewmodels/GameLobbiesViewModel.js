function GameLobbiesViewModel(connection) {
    var self = this;

    self.connection = connection;
    self.gameLobbies = ko.observableArray();

    self.getGameLobbies = function() {
        self.gameLobbies.removeAll();
        fetch(webAPIIPAddress + "/api/gamelobbies", {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            response.json().then(function(data) {
                data.forEach(function(element) {
                    console.log(element);
                    var gameLobby = new GameLobbyViewModel(connection, element);
                    console.log(gameLobby);
                    self.gameLobbies.push(gameLobby);
                });
            });
        })
    }
}