using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System;
using System.IO;
using System.Text;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Web.API.Controllers {
    
    [Route("api/test")]
    [EnableCors("AllowSpecificOrigin")]
    public class TestController : Controller {

        [Route("authorized")]
        [HttpGet]
        public string TestGetAuthorized() {
            Console.WriteLine(HttpContext.Request.Cookies.Count);
            Console.WriteLine(HttpContext.User.GetUserName());
            return HttpContext.User.GetUserName();
        }

        [HttpGet]
        [Route("")]
        public string TestGet() {
            Console.WriteLine(HttpContext.User.GetUserName());
            return HttpContext.User.GetUserName();
        }

        [Route("")]
        [HttpPost]
        public async void Post(string username) {
            var bodyStr = "";
            var req = HttpContext.Request;
            foreach(var i in HttpContext.Request.Headers) {
                Console.WriteLine(i.Key + " : " + i.Value);
            }

            // Arguments: Stream, Encoding, detect encoding, buffer size 
            // AND, the most important: keep stream opened
            using (StreamReader reader 
                    = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                bodyStr = reader.ReadToEnd();
            }
            Console.WriteLine(bodyStr);
            Console.WriteLine("post" + username);
        }

    }
}
