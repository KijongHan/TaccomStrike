using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.HubApi
{
	public class GameLobbyLeaveGame
	{
		public GetUser PlayerLeaving { get; set; }

		public GetUser Host { get; set; }

		public List<GetUser> Players { get; set; }
	}
}
