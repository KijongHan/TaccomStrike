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
using System.Text.Encodings.Web;
using AvaNet.Services;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumThreadsController : Controller
    {

        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumTopicRepository forumTopicRepository;

        private readonly IForumLikeRepository forumLikeRepository;

        private readonly UserManager<ApplicationUser> userManager;

        private readonly HtmlSanitizer htmlSanitizer;

        public ForumThreadsController(HtmlSanitizer htmlSanitizer, IForumLikeRepository forumLikeRepository, IForumTopicRepository forumTopicRepository, IForumThreadRepository forumThreadRepository, UserManager<ApplicationUser> userManager)
        {
            this.forumThreadRepository = forumThreadRepository;
            this.forumTopicRepository = forumTopicRepository;
            this.forumLikeRepository = forumLikeRepository;
            this.userManager = userManager;
            this.htmlSanitizer = htmlSanitizer;
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

        //Method called when the user has presedd a like/dislike/neutral button
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
            ForumThread forumThread = forumThreadRepository.Find(forumLike.ForumThreadID, true);
            
            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumLike fl in forumThread.ForumLikes)
            {
                if (fl.ApplicationUser.Id.Equals(user.Id))
                {
                    if (forumLike.Weight == fl.Weight)
                    {
                        return RedirectToAction("Index/" + forumLike.ForumThreadID);
                    }
                }
            }

            forumLike.ApplicationUser = user;
            forumLikeRepository.Add(forumLike);
            return RedirectToAction("Index/" + forumLike.ForumThreadID);
            
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Title, Content, ForumTopicID")] ForumThread forumThread)
        {
            //Convert any new line characters.
            forumThread.Content = forumThread.Content.Replace("\r\n", "<br />");
            //Security check
            //forumThread.Content = HtmlAgilityPack.HtmlDocument.HtmlEncode(forumThread.Content);
            forumThread.Content = htmlSanitizer.RemoveUnwantedTags(forumThread.Content);
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();

            //Set creator of forum thread
            forumThread.ApplicationUser = user;
            forumThread.ForumThreadCreationTime = DateTime.UtcNow;
            forumThreadRepository.Add(forumThread);

            return RedirectToAction("Index/" + forumThread.ForumThreadID);
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}
