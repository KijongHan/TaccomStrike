using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class ChatUserConnected
	{
		public GetUser NewUser { get; set; }

		public List<GetUser> ConnectedUsers { get; set; }
	}
}
