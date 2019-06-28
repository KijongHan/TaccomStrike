using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.Model
{
	public class UserFriendship
	{
		public int UserFromID { get; set; }
		public UserLogin FromUserLogin { get; set; }

		public int UserToID { get; set; }
		public UserLogin ToUserLogin { get; set; }

		public DateTime? WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }
	}
}
