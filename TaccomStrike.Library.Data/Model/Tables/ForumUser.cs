using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{
	[Table("ForumUser", Schema="forum")]
	public class ForumUser
	{
		[Key, Column("ForumUserID")]
		public int ForumUserID {get;set;}

		[Column("WhenCreated")]
		public DateTime? WhenCreated {get;set;}

		[Column("WhenDeleted")]
		public DateTime? WhenDeleted {get;set;}
	}
}
