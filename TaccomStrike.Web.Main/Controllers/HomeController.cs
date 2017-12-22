using Microsoft.AspNetCore.Mvc;

[Route("")]
public class HomeController : Controller {

    [HttpGet]
    [Route("")]
    public IActionResult Index() {
        return View("Index");
    }

}