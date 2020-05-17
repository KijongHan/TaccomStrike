using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ApiEntities;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class GameLobbyJoin
	{
		public GetUser NewUser { get; set; }

		public GetGameLobby GameLobby { get; set; }
	}
}
