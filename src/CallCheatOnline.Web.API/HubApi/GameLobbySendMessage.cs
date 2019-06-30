using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.Enums;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class GameLobbySendMessage
	{
		public GameLobbyMessageType MessageType { get; set; }
		public GetChatMessage ChatMessage { get; set; }
	}
}
