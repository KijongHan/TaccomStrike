using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TaccomStrike.Library.Data.Model.Views
{
	[Table("UserComplete", Schema = "auth")]
	public class UserComplete
	{
		[Column("UserLoginID")]
		public int UserLoginID { get; set; }

		[Column("Username")]
		public string Username { get; set; }

		[Column("GameScore")]
		public int GameScore { get; set; }
	}
}
