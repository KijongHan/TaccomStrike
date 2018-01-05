using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services {
    public class GameLobbyService {

        private List<GameLobby> gameLobbies;

        public GameLobbyService() {
            gameLobbies = new List<GameLobby>();
        }

        public string AddGameLobby(GameLobby gameLobby, ClaimsPrincipal creator) {
            var salt = Authentication.GenerateSalt();
            gameLobby.GameLobbyID = salt;
            gameLobby.GameLobbyType = GameLobby.LobbyType.Public;
            gameLobby.AddUser(creator);
            gameLobbies.Add(gameLobby);
            return salt;
        }

        public GameLobby GetGameLobby(string gameLobbyID) {
            return gameLobbies
            .Where((item) => item.GameLobbyID==gameLobbyID)
            .FirstOrDefault();
        }

        public List<GameLobby> GetGameLobbies() {
            return gameLobbies;
        }

    }
}