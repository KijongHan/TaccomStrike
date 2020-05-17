using System;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Library.Data.Enums;

namespace CallCheatOnline.Library.Data.ViewModel
{
	public class CreateGameLobby
	{
		public int MaxRoomLimit { get; set; }

		public GameMode GameMode { get; set; }

		public string GameLobbyName { get; set; }
	}
}
