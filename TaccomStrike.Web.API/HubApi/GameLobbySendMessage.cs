using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.Enums;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.HubApi
{
	public class GameLobbySendMessage
	{
		public GameLobbyMessageType MessageType { get; set; }
		public GetChatMessage ChatMessage { get; set; }
	}
}
