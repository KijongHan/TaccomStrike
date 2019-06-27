using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CallCheatOnline.Library.Data.Services;
using Microsoft.AspNetCore.Authentication;
using CallCheatOnline.Library.Utility.Security;
using CallCheatOnline.Library.Data.ViewModel;
using Microsoft.AspNetCore.Cors;
using CallCheatOnline.Library.Data.Utility;

namespace CallCheatOnline.Web.API.Controllers
{
	[Route("api/authentication")]
	[EnableCors("AllowSpecificOrigin")]
	public class AuthenticationController : Controller
	{

		private UserAuthenticationService authenticationService;

		public AuthenticationController(UserAuthenticationService authenticationService)
		{
			this.authenticationService = authenticationService;
		}

		[Route("login")]
		[HttpPost]
		public async Task<IActionResult> PostAsync([FromBody] PostUserLogin loginEntity)
		{
			var claimsPrincipal = await authenticationService.AuthenticateLoginAsync(loginEntity);

			if(claimsPrincipal == null)
			{
				return NotFound();
			}

			await HttpContext.SignInAsync
				(
					Security.AuthenticationScheme, claimsPrincipal
				);
			return Ok(claimsPrincipal.ApiGetUser());
		}
	}
}