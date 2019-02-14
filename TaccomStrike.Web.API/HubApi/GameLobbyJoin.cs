using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.ApiEntities;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.HubApi
{
	public class GameLobbyJoin
	{
		public GetUser NewUser { get; set; }

		public GetGameLobby GameLobby { get; set; }
	}
}
