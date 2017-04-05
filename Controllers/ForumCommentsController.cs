using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AvaNet.Models;
using Microsoft.AspNetCore.Identity;
using AvaNet.DataAccessLayer;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumCommentsController : Controller
    {

        private readonly UserManager<ApplicationUser> userManager;

        private readonly IForumCommentRepository forumCommentRepository;

        public ForumCommentsController(UserManager<ApplicationUser> userManager, IForumCommentRepository forumCommentRepository)
        {
            this.userManager = userManager;
            this.forumCommentRepository = forumCommentRepository;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Like([Bind("ForumThreadID, Weight")] ForumLike forumLike)
        {
            //Not in the boundary of like weightings
            if (forumLike.Weight < -1 && forumLike.Weight > 1)
            {
                return null;
            }

            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumThread forumThread = forumCommentRepository.Find(forumLike.ForumThreadID, true);

            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumLike fl in forumThread.ForumLikes)
            {
                if (fl.ApplicationUser.Id.Equals(user.Id))
                {
                    if (forumLike.Weight == fl.Weight)
                    {
                        return RedirectToAction("Details/" + forumLike.ForumThreadID);
                    }
                }
            }

            forumLike.ApplicationUser = user;
            forumLikeRepository.Add(forumLike);
            return RedirectToAction("Details/" + forumLike.ForumThreadID);
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
            forumComment.ForumCommentCreationTime = DateTime.UtcNow; 
            forumCommentRepository.Add(forumComment);

            return Redirect("/ForumThreads/Details/" + forumComment.ForumThreadID);
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}
