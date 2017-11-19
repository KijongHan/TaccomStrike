using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaccomStrike.Library.Data.Services;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Web.API.Controllers
{
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {

        private Library.Data.Services.AuthenticationService authenticationService;

        public AuthenticationController(Library.Data.Services.AuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateTaccomStrikeUser userEntity)
        {
            if(authenticationService.CreateLogin(userEntity) == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> PostAsync(LoginTaccomStrikeUser loginEntity)
        {
            var claimsPrincipal = authenticationService.AuthenticateLogin(loginEntity);

            if(claimsPrincipal == null)
            {
                return NotFound();
            }

            await HttpContext.SignInAsync
                (
                    Security.AuthenticationScheme, claimsPrincipal
                );
            return Ok();
        }
    }
}