using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Web.API.HubApi
{
	public class ChatUserDisconnected
	{
		public GetUser DisconnectedUser { get; set; }
	}
}
