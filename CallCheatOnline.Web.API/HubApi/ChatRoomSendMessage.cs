using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class ChatRoomSendMessage
	{
		public GetChatMessage ChatMessage { get; set; }

		public string ChatRoomName { get; set; }
	}
}
