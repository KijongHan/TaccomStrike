using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GetUser
	{
		public int UserID { get; set; }

		public string Username { get; set; }

		public GetUser() { }

		public GetUser(ClaimsPrincipal principal)
		{
			UserID = principal.GetUserLoginID();
			Username = principal.GetUserName();
		}
	}
}
