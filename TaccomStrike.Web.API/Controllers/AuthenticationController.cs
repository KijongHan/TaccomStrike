using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;

namespace TaccomStrike.Web.API.Controllers
{
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        [Route("login")]
        [HttpPost]
        public async Task Post([FromBody]string value)
        {
            /*
             var claims = new List<Claim>() { new Claim(ClaimTypes.Name, "Test") };
            var claimsIdentity = new ClaimsIdentity(claims, "cookie", "name", "role");
            await HttpContext.SignInAsync
                (
                    "MyAuthentication",
                    new ClaimsPrincipal(claimsIdentity)
                );
             */

            var responseCookie = HttpContext.Response;
        }
    }
}