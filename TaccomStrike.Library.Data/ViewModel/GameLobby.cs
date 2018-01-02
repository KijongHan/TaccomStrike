using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameLobby {

        public enum LobbyType {
            Public, Private, Competitive
        }

        public enum GameType {
            OneOnOne
        }

        public string GameLobbyName {get;set;}
        public string GameLobbyID {get;set;}
        public string GameLobbyPassword {get;set;}

        public ClaimsPrincipal Host {get;set;}
        public List<ClaimsPrincipal> Players {get;set;}
        public List<ClaimsPrincipal> Spectators {get;set;}

        public GameLobby.LobbyType GameLobbyType {get;set;}
        public GameLobby.GameType GameLobbyGameType {get;set;}

        public int MaxRoomLimit {get;set;}

        public GameLobby() {
            Players = new List<ClaimsPrincipal>();
            Spectators = new List<ClaimsPrincipal>();
        }

        public List<ClaimsPrincipal> GetUsers() {
            List<ClaimsPrincipal> users = new List<ClaimsPrincipal>();
            users.Add(Host);
            users.Concat(Players);
            users.Concat(Spectators);
            return users;
        }

        public int GetUsersCount() {
            int count = 0;
            if(Host != null) {
                count += 1;
            }

            count += Players.Count;
            count += Spectators.Count;
            return count;
        }

        public void AddUser(ClaimsPrincipal user) {
            if(Players.Count < 2) {
                Players.Add(user);
            }
            else {
                Spectators.Add(user);
            }
        }

        public bool HasUser(ClaimsPrincipal user) {
            foreach(var u in GetUsers()) {
                if(u.GetUserLoginID() == user.GetUserLoginID()) {
                    return true;
                }
            }
            return false;
        }
    }
}
