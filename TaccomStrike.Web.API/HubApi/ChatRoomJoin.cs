using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.HubApi
{
	public class ChatRoomJoin
	{
		public GetUser NewUser { get; set; }

		public GetChatRoom ChatRoom { get; set; }
	}
}
