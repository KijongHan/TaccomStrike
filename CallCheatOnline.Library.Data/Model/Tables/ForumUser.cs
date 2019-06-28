using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CallCheatOnline.Library.Data.Model
{
	public class ForumUser
	{
		public int ForumUserID {get;set;}
		
		public DateTime? WhenCreated {get;set;}
		
		public DateTime? WhenDeleted {get;set;}

		public UserLogin UserLogin { get; set; }
	}
}
