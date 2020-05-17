using CallCheatOnline.Game.CallCheat;
using System;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Library.Data.ApiEntities
{
	public class GetGameUser
	{
		public GameUserState State { get; set; }

		public int GameUserID { get; set; }

		public GetUser User { get; set; }

		public int HandCount { get; set; }

		public GetGameUser() { }

		public GetGameUser(GameUser gameUser)
		{
			State = gameUser.State;
			GameUserID = gameUser.GameUserID;
			User = new GetUser(gameUser.UserPrincipal);
			HandCount = gameUser.Hand.Count;
		}
	}
}
