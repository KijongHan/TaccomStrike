using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class UserLogin
	{
		public int UserLoginID { get; set; }

		public string Username { get; set; }

		public string Email { get; set; }

		public string PasswordHash { get; set; }

		public string PasswordSalt { get; set; }

		public DateTime? WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }

		public int ForumUserID { get; set; }
		public ForumUser ForumUser { get; set; }

		public int GameUserID { get; set; }
		public GameUser GameUser { get; set; }

		public List<UserLoginAndRole> UserLoginAndRoles { get; set; }

		public List<UserFriendship> UserFriendships { get; set; }
	}
}
