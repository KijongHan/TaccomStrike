using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class ChatRoomJoin
	{
		public GetUser NewUser { get; set; }

		public GetChatRoom ChatRoom { get; set; }
	}
}
