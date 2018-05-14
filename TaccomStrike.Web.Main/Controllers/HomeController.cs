using Microsoft.AspNetCore.Mvc;
using System.Configuration;
using System;

[Route("")]
public class HomeController : Controller {

    [HttpGet]
    [Route("")]
    public IActionResult Index() {
        ViewData["WebAPIPIAddress"] = ConfigurationManager.AppSettings["WebAPIIPAddress"];
        return View("Index");
    }

}