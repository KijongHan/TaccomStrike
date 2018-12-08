using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.ApiEntities;

namespace TaccomStrike.Web.API.HubApi
{
	public class GameEndTurn
	{
		public GetGameState GameState { get; set; }
	}
}
