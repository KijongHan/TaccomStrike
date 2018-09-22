using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameLobby
	{
		public string GameLobbyName { get; set; }

		public string GameLobbyID { get; set; }

		public int MaxRoomLimit { get; set; }

		public GetUser Host { get; set; }

		public List<GetUser> Player { get; set; }
	}
}
