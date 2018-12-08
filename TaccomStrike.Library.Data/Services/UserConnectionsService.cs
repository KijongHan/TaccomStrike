using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace TaccomStrike.Library.Data.Services
{
	public class UserConnectionsService
	{
		public ConnectionService GameConnectionService { get; set; }
		public ConnectionService ChatConnectionService { get; set; }

		public UserConnectionsService()
		{
			GameConnectionService = new ConnectionService();
			ChatConnectionService = new ConnectionService();
		}
	}
}
