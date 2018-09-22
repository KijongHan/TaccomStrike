using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;

public class ConnectionService
{
	private readonly Dictionary<int, string> userConnections;
	private readonly Dictionary<int, ClaimsPrincipal> users;

	public object ConnectionLock = new object();

	public ConnectionService()
	{
		users = new Dictionary<int, ClaimsPrincipal>();
		userConnections = new Dictionary<int, string>();
	}
	
	public void Add(ClaimsPrincipal user, string connectionId)
	{
		lock (ConnectionLock)
		{
			if(!userConnections.ContainsKey(user.GetUserLoginID()))
			{
				userConnections.Add(user.GetUserLoginID(), connectionId);
				users.Add(user.GetUserLoginID(), user);
			}
		}
	}

	public List<ClaimsPrincipal> GetUsers()
	{
		lock(ConnectionLock)
		{
			return users.Values.ToList();
		}
	}

	public List<string> GetUserConnections()
	{
		lock(ConnectionLock)
		{
			return userConnections.Values.ToList();
		}
	}

	public string GetConnection(int userID)
	{
		lock (ConnectionLock)
		{
			if (userConnections.ContainsKey(userID))
			{
				return userConnections[userID];
			}
		}
		return null;
	}

	public string GetConnection(ClaimsPrincipal user)
	{
		return GetConnection(user.GetUserLoginID());
	}

	public void Remove(ClaimsPrincipal user, string connectionId)
	{
		lock (ConnectionLock)
		{
			if(!userConnections.ContainsKey(user.GetUserLoginID()))
			{
				return;
			}

			userConnections.Remove(user.GetUserLoginID());
			users.Remove(user.GetUserLoginID());
		}
	}
}