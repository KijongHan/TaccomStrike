using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services {
    public class GameLobbyService {

        private List<GameLobby> gameLobbies;
        private List<ClaimsPrincipal> competitiveQueue;

        public GameLobbyService() {
            gameLobbies = new List<GameLobby>();
            competitiveQueue = new List<ClaimsPrincipal>();
        }

        public List<GameLobby> CompetitiveGameLobbies() {
            return gameLobbies
            .Where((item) => item.GameLobbyType==GameLobby.LobbyType.Competitive)
            .ToList();
        }

        public void AddGameLobby(GameLobby gameLobby, ClaimsPrincipal creator) {
            var salt = Authentication.GenerateSalt();
            gameLobby.GameLobbyID = salt;
            gameLobby.Host = creator;
            gameLobbies.Add(gameLobby);
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