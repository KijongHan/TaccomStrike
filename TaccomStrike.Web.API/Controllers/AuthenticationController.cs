using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaccomStrike.Library.Data.Services;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;
using Microsoft.AspNetCore.Cors;

namespace TaccomStrike.Web.API.Controllers
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
                
            foreach(var i in HttpContext.Response.Headers) {
                Console.WriteLine(i.Key + ":" + i.Value);
            }
            return Ok();
        }

        [Route("tlogin")]
        [HttpPost]
        public async Task<IActionResult> PostAsyncs([FromBody] PostUserLogin loginEntity)
        {
            Console.WriteLine("A:" + loginEntity.Username);

            var claimsPrincipal = await authenticationService.AuthenticateLoginAsync(loginEntity);

            if(claimsPrincipal == null)
            {
                return NotFound();
            }

            await HttpContext.SignInAsync
                (
                    Security.AuthenticationScheme, claimsPrincipal
                );
            
            HttpContext.Response.Headers.Remove("Access-Control-Allow-Origin");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Set-Cookie");
            HttpContext.Response.Headers.Add("Test", "Test");
            foreach(var i in HttpContext.Response.Headers) {
                Console.WriteLine(i.Key + ":" + i.Value);
            }
            return Ok();
        }
    }
}