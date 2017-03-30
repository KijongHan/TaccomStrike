using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AvaNet.Models;
using AvaNet.DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumThreadsController : Controller
    {

        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumTopicRepository forumTopicRepository;

        private readonly UserManager<ApplicationUser> userManager;

        public ForumThreadsController(IForumTopicRepository forumTopicRepository, IForumThreadRepository forumThreadRepository, UserManager<ApplicationUser> userManager)
        {
            this.forumThreadRepository = forumThreadRepository;
            this.forumTopicRepository = forumTopicRepository;
            this.userManager = userManager;
        }

        // GET: /<controller>/
        public IActionResult Index(int ID)
        {   
            return View(forumThreadRepository.Find(ID, true));
        }

        public IActionResult Create()
        {
            return View(forumTopicRepository.GetAll());
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Title, Content, ForumTopicID")] ForumThread forumThread)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();

            //Set creator of forum thread
            forumThread.ApplicationUser = user;
            forumThreadRepository.Add(forumThread);

            return RedirectToAction("Index/" + forumThread.ForumThreadID);
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}
