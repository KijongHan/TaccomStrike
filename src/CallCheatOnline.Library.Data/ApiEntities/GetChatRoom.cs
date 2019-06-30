using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.ViewModel
{
	public class GetChatRoom
	{
		public string ChatRoomName { get; internal set; }

		public List<GetUser> Participants { get; internal set; }
	}
}
