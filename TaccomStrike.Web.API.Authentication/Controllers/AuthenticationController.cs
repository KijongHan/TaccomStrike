using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaccomStrike.Library.Data.Services;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;

[Route("api/authentication")]
    public class AuthenticationController : Controller
    {

        private UserAuthenticationService authenticationService;

        public AuthenticationController(UserAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateUserLogin userEntity)
        {
            if(await authenticationService.CreateLoginAsync(userEntity) == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> PostAsync(PostUserLogin loginEntity)
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
            return Ok();
        }
    }