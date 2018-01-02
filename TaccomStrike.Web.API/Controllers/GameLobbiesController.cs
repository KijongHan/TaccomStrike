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

namespace TaccomStrike.Web.API.Controllers {
    
    [Route("api/gamelobbies")]
    [EnableCors("AllowSpecificOrigin")]
    public class GameLobbiesController : Controller {

        private GameLobbyService gameLobbyService;

        public GameLobbiesController(GameLobbyService gameLobbyService) {
            this.gameLobbyService = gameLobbyService;
        }

        [Route("")]
        [HttpPost]
        public IActionResult CreateGameLobby([FromBody] GameLobbyViewModel gameLobbyViewModel) {
            GameLobby gameLobby = new GameLobby {
                GameLobbyName = gameLobbyViewModel.GameLobbyName,
                MaxRoomLimit = gameLobbyViewModel.MaxRoomLimit
            };
            
            gameLobbyService.AddGameLobby(gameLobby, HttpContext.User);
            return Ok();
        }

        [Route("")]
        [HttpGet]
        public IActionResult GetGameLobbies() {
            var gameLobbies = gameLobbyService
            .GetGameLobbies()
            .Select((item) => new {
                GameLobbyID = item.GameLobbyID,
                HostUserName = item.Host.GetUserName(),
                UserCount = item.GetUsersCount(),
                MaxRoomLimit = item.MaxRoomLimit
            })
            .ToList();
            return Ok(gameLobbies);
        }
    }

    public class GameLobbyViewModel {
        public int MaxRoomLimit {get;set;}
        public string GameLobbyName {get;set;}
    }
}