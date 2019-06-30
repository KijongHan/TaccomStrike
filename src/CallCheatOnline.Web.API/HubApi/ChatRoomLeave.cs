using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class ChatRoomLeave
	{
		public GetUser LeavingUser { get; set; }

		public GetChatRoom ChatRoom { get; set; }
	}
}
