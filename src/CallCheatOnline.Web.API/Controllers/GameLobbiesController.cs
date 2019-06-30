using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.IO;
using System.Text;
using CallCheatOnline.Library.Utility.Security;
using CallCheatOnline.Library.Data.Services;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Data.Utility;

namespace CallCheatOnline.Web.API.Controllers
{
	[Route("api/gamelobbies")]
	[EnableCors("AllowSpecificOrigin")]
	public class GameLobbiesController : Controller
	{
		private GameLobbyService gameLobbyService;

		public GameLobbiesController(GameLobbyService gameLobbyService)
		{
			this.gameLobbyService = gameLobbyService;
		}

		[Authorize]
		[Route("")]
		[HttpPost]
		public IActionResult CreateGameLobby([FromBody] CreateGameLobby gameLobbyViewModel)
		{
			GameLobby gameLobby = new GameLobby
			{
				GameLobbyName = gameLobbyViewModel.GameLobbyName,
				GameMode = gameLobbyViewModel.GameMode,
				MaxRoomLimit = 4
			};
			
			if(HttpContext.User.InGameLobby())
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

		[Route("count")]
		[HttpGet]
		public IActionResult GetGameLobbiesCount()
		{
			var count = gameLobbyService.GetGameLobbies().Count;
			return Ok(count);
		}
	}
}