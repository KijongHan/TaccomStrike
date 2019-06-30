using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.ApiEntities;

namespace CallCheatOnline.Web.API.HubApi
{
	public class GameCallCheat
	{
		public GetGameState GameState { get; set; }

		public GetGameCheat GameCheat { get; set; }
	}
}
