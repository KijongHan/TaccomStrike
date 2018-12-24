using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.IO;
using System.Text;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Utility;

namespace TaccomStrike.Web.API.Controllers {
	
	[Route("api/gamelobbies")]
	[EnableCors("AllowSpecificOrigin")]
	public class GameLobbiesController : Controller
	{

		private GameLobbyService gameLobbyService;

		public GameLobbiesController(GameLobbyService gameLobbyService)
		{
			this.gameLobbyService = gameLobbyService;
		}

		[Route("")]
		[HttpPost]
		public IActionResult CreateGameLobby([FromBody] CreateGameLobby gameLobbyViewModel)
		{
			GameLobby gameLobby = new GameLobby 
			{
				GameLobbyName = gameLobbyViewModel.GameLobbyName,
				MaxRoomLimit = gameLobbyViewModel.MaxRoomLimit
			};
			
			if(HttpContext.User.GetCurrentGameLobbyID() != null)
			{
				return BadRequest();
			}
			gameLobbyService.AddGameLobby(gameLobby, HttpContext.User);
			return Ok(gameLobby.ApiGetGameLobby());
		}

		[Route("")]
		[HttpGet]
		public IActionResult GetGameLobbies()
		{
			var gameLobbies = gameLobbyService
				.GetGameLobbies()
				.ApiGetGameLobbies()
				.ToList();
			return Ok(gameLobbies);
		}
	}
}