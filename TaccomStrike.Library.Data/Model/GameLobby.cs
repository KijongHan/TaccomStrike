using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Game.CallCheat.Services;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GameLobby
	{

		public enum LobbyType
		{
			Public, Private, Competitive
		}

		public enum GameType
		{
			OneOnOne
		}

		public string GameLobbyName {get;set;}
		public long GameLobbyID {get;set;}
		public string GameLobbyPassword {get;set;}

		public List<ClaimsPrincipal> Hosts {get;set;}
		public List<ClaimsPrincipal> Players {get;set;}

		public GameLobby.LobbyType GameLobbyType {get;set;}
		public GameLobby.GameType GameLobbyGameType {get;set;}

		public GameLogicController GameLogicController {get;set;}

		public int MaxRoomLimit {get;set;}

		public GameLobby()
		{
			Hosts = new List<ClaimsPrincipal>();
			Players = new List<ClaimsPrincipal>();
		}

		public bool InGame()
		{
			if(GameLogicController==null)
			{
				return false;
			}
			return true;
		}

		public bool StartGame()
		{
			if(Players.Count < 2)
			{
				return false;
			}

			GameLogicController = new GameLogicController();
			GameLogicController.StartGame(Players);
			return true;
		 }

		public ClaimsPrincipal GetHost()
		{
			if(Hosts.Count<=0)
			{
				return null;
			}
			return Hosts[0];
		}

		public List<ClaimsPrincipal> GetUsers()
		{
			return Players;
		}

		public int GetUsersCount()
		{
			int count = 0;
			
			count += Players.Count;
			return count;
		}

		public void AddUser(ClaimsPrincipal user)
		{
			if(HasUser(user))
			{
				return;
			}

			if(Hosts.Count == 0)
			{
				Hosts.Add(user);
			}
			Players.Add(user);
		}

		public void RemoveUser(ClaimsPrincipal user)
		{
			if(!HasUser(user))
			{
				return;
			}

			var removeUser = Players
			.Where((item) => item.GetUserLoginID() == user.GetUserLoginID())
			.FirstOrDefault();

			Players.Remove(removeUser);
			Hosts.Remove(removeUser);
			if(Hosts.Count==0 && Players.Count>0)
			{
				Hosts.Add(Players[0]);
			}
		}

		public bool HasUser(ClaimsPrincipal user)
		{
			foreach(var u in GetUsers())
			{
				if(u.GetUserLoginID() == user.GetUserLoginID())
				{
					return true;
				}
			}
			return false;
		}
	}
}
