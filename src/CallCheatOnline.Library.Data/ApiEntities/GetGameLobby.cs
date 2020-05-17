using System;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Library.Data.Enums;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Library.Data.ApiEntities
{
	public class GetGameLobby
	{
		public string GameLobbyName { get; set; }

		public long GameLobbyID { get; set; }

		public int MaxRoomLimit { get; set; }

		public GameMode GameMode { get; set; }

		public GetUser Host { get; set; }

		public List<GetUser> Players { get; set; }
	}
}
