using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CallCheatOnline.Library.Data.Model
{
	public class GameUser
	{
		public int GameUserID { get; set; }

		public int GameScore { get; set; }

		public DateTime? WhenCreated { get; set; }

		public DateTime? WhenDeleted { get; set; }
	}
}
