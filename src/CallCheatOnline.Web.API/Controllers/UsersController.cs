using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CallCheatOnline.Library.Data.DAL;
using CallCheatOnline.Library.Data.Services;
using CallCheatOnline.Library.Data.Utility;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Web.API.Controllers
{
	[Route("api/users")]
	[EnableCors(Security.CrossOriginRequestPolicy)]
	public class UsersController : Controller
	{
		private readonly UserConnectionsService userConnectionsService;
		private readonly UserLoginRepository userLoginRepository;
		private readonly GuestLoginRepository guestLoginRepository;

		public UsersController(
			UserLoginRepository userLoginRepository, 
			GuestLoginRepository guestLoginRepository, 
			UserConnectionsService userConnectionsService)
		{
			this.userLoginRepository = userLoginRepository;
			this.guestLoginRepository = guestLoginRepository;
			this.userConnectionsService = userConnectionsService;
		}

		[Route("leaderboard")]
		[HttpGet]
		public async Task<IActionResult> GetLeaderboard([FromQuery] int top)
		{
			var leaderboard = await userLoginRepository.GetLeaderboard(top);
			return Ok(leaderboard);
		}

		[Route("connected/count")]
		[HttpGet]
		public IActionResult GetConnectedUsers()
		{
			var count = userConnectionsService.GameConnectionService.GetUserConnections().Count;
			return Ok(count);
		}

		[Route("")]
		[HttpGet]
		public async Task<IActionResult> GetUserLogins([FromQuery] string username, [FromQuery] string email)
		{
			var userLogins = await userLoginRepository.GetUserLoginsAsync(email, username);
			return Ok(userLogins.ApiGetUsers());
		}

		[Route("guests")]
		[HttpGet]
		public async Task<IActionResult> GetGuestLogins([FromQuery] string guestname) 
		{
			return await Task.Run(() => {
				var guestLogins = guestLoginRepository.GetGuestLogins(guestname);
				return Ok(guestLogins.ApiGetUsers());
			});
		}

		[Route("")]
		[HttpPost]
		public async Task<IActionResult> CreateAsync([FromBody] CreateUserLogin userEntity)
		{
			var createdUserLogin = await userLoginRepository.CreateUserLoginAsync(userEntity);
			if (createdUserLogin == null)
			{
				return NotFound();
			}

			return Ok(createdUserLogin.ApiGetUser());
		}
	}
}
