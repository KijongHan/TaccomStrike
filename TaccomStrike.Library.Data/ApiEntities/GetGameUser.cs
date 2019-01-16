using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Game.CallCheat;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameUser
	{
		public int GameUserID { get; set; }

		public GetUser User { get; set; }

		public int HandCount { get; set; }

		public GetGameUser() { }

		public GetGameUser(GameUser gameUser)
		{
			GameUserID = gameUser.GameUserID;
			User = new GetUser(gameUser.UserPrincipal);
			HandCount = gameUser.Hand.Count;
		}
	}
}
