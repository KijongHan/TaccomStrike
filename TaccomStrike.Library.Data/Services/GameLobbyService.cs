using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services
{
	public class GameLobbyService
	{
		private object serviceLock;
		private List<GameLobby> gameLobbies;

		private static long nextGameLobbyID = 1;

		public GameLobbyService()
		{
			gameLobbies = new List<GameLobby>();
			serviceLock = new object();
		}

		private long generateUniqueID()
		{
			lock(serviceLock)
			{
				long gameLobbyID = nextGameLobbyID;
				nextGameLobbyID = nextGameLobbyID + 1;
				return gameLobbyID;
			}
		}

		public long AddGameLobby(GameLobby gameLobby, ClaimsPrincipal creator)
		{
			long id = generateUniqueID();
			gameLobby.GameLobbyID = id;
			gameLobbies.Add(gameLobby);
			return id;
		}

		public void RemoveGameLobby(long gameLobbyID)
		{
			var gameLobby = gameLobbies
			.Where((item) => item.GameLobbyID==gameLobbyID)
			.FirstOrDefault();
			gameLobbies.Remove(gameLobby);
		}

		public GameLobby GetGameLobby(long gameLobbyID)
		{
			return gameLobbies
			.Where((item) => item.GameLobbyID==gameLobbyID)
			.FirstOrDefault();
		}

		public List<GameLobby> GetGameLobbies()
		{
			return gameLobbies;
		}
	}
}