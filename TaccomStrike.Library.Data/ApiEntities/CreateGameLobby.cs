using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.Enums;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class CreateGameLobby
	{
		public int MaxRoomLimit { get; set; }

		public GameMode GameMode { get; set; }

		public string GameLobbyName { get; set; }
	}
}
