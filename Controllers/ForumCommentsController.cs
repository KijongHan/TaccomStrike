using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AvaNet.Models;
using Microsoft.AspNetCore.Identity;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumCommentsController : Controller
    {

        private readonly UserManager<ApplicationUser> userManager;

        public ForumCommentsController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create([Bind("Content, ForumThreadID")] ForumComment forumComment)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();

            //Set comment creator
            forumComment.ApplicationUser = user;
            return null ; 
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }

    }
}
