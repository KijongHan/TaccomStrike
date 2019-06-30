using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using CallCheatOnline.Library.Utility.Security;

public class ConnectionService
{
	private readonly Dictionary<int, string> userConnections;
	private readonly Dictionary<int, ClaimsPrincipal> users;

	public ConnectionService()
	{
		users = new Dictionary<int, ClaimsPrincipal>();
		userConnections = new Dictionary<int, string>();
	}
	
	public void Add(ClaimsPrincipal user, string connectionId)
	{
		if (!userConnections.ContainsKey(user.GetUserLoginID()))
		{
			userConnections.Add(user.GetUserLoginID(), connectionId);
			users.Add(user.GetUserLoginID(), user);
		}
	}

	public List<ClaimsPrincipal> GetUsers()
	{
		return users.Values.ToList();
	}

	public List<string> GetUserConnections()
	{
		return userConnections.Values.ToList();
	}

	public string GetConnection(int userID)
	{
		if (userConnections.ContainsKey(userID))
		{
			return userConnections[userID];
		}
		return null;
	}

	public string GetConnection(ClaimsPrincipal user)
	{
		return GetConnection(user.GetUserLoginID());
	}

	public void Remove(ClaimsPrincipal user, string connectionId)
	{
		if (!userConnections.ContainsKey(user.GetUserLoginID()))
		{
			return;
		}

		userConnections.Remove(user.GetUserLoginID());
		users.Remove(user.GetUserLoginID());
	}
}