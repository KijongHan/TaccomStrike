using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.HubApi
{
	public class ChatUserConnected
	{
		public GetUser NewUser { get; set; }

		public List<GetUser> ConnectedUsers { get; set; }
	}
}
