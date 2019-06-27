using Microsoft.AspNetCore.Mvc;

[Route("authentication")]
public class AuthenticationController : Controller {

    [HttpGet]
    [Route("login")]
    public IActionResult Index() {
        return View("Login");
    }

    [HttpGet]
    [Route("register")]
    public IActionResult Register() {
        return View("Register");
    }

}