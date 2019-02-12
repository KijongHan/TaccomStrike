using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaccomStrike.Library.Data.DAL;
using TaccomStrike.Library.Data.Utility;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.Controllers
{
	[Route("api/users")]
	[EnableCors("AllowSpecificOrigin")]
	public class UsersController : Controller
	{
		private readonly UserLoginRepository userLoginRepository;

		public UsersController(UserLoginRepository userLoginRepository)
		{
			this.userLoginRepository = userLoginRepository;
		}

		[Route("")]
		[HttpGet]
		public async Task<IActionResult> GetUserLogins([FromQuery] string username, [FromQuery] string email)
		{
			var userLogins = await userLoginRepository.GetUserLoginsAsync(email, username);
			return Ok(userLogins.ApiGetUsers());
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
