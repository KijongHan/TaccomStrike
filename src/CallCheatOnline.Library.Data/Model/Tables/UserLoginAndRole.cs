using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.Model
{
	public class UserLoginAndRole
	{
		public int UserLoginID { get; set; }
		public UserLogin UserLogin { get; set; }

		public int UserRoleID { get; set; }
		public UserRole UserRole { get; set; }

		public DateTime? WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }
	}
}
