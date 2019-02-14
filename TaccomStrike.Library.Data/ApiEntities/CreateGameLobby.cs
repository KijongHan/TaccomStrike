using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class CreateGameLobby
	{
		public int MaxRoomLimit { get; set; }

		public GameLobby.Mode GameMode { get; set; }

		public string GameLobbyName { get; set; }
	}
}
