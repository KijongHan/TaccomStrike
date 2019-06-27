using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace CallCheatOnline.Library.Data.Model
{
	public class ChatMessage
	{
		public ClaimsPrincipal User { get; set; }

		public string Message { get; set; }

		public DateTime WhenCreated { get; set; }
	}
}
