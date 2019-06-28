using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ApiEntities;

namespace CallCheatOnline.Web.API.HubApi
{
	public class GameEndTurn
	{
		public GetGameState GameState { get; set; }
	}
}
