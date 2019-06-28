using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class UserRole 
	{
		public int UserRoleID {get;set;}
		
		public string RoleName {get;set;}
		
		public DateTime? WhenCreated {get;set;}
		
		public DateTime? WhenDeleted {get;set;}

		public List<UserLoginAndRole> UserLoginAndRoles { get; set; }

		public List<UserFriendship> UserFriendships { get; set; }
	}
}