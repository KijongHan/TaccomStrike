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

        private readonly IForumLikeRepository forumLikeRepository;

        private readonly UserManager<ApplicationUser> userManager;

        public ForumThreadsController(IForumLikeRepository forumLikeRepository, IForumTopicRepository forumTopicRepository, IForumThreadRepository forumThreadRepository, UserManager<ApplicationUser> userManager)
        {
            this.forumThreadRepository = forumThreadRepository;
            this.forumTopicRepository = forumTopicRepository;
            this.forumLikeRepository = forumLikeRepository;
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

        //Method called when the user has presedd a like/dislike/neutral button
        [Authorize]
        public async Task<IActionResult> Like(int forumThreadID, int weight)
        {
            //Not in the boundary of like weightings
            if (weight < -1 && weight > 1)
            {
                return null;
            }

            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumThread forumThread = forumThreadRepository.Find(forumThreadID, true);
            
            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumThreadLike forumLike in forumThread.ForumLikes)
            {
                if (forumLike.ApplicationUser.Id.Equals(user.Id))
                {
                    if (weight == forumLike.Weight)
                    {
                        return RedirectToAction("Index/" + forumThreadID);
                    }
                }
            }

            forumLikeRepository.Add
                ( 
                    new ForumThreadLike { ForumThreadID=forumThreadID, Weight=weight,ApplicationUser=user }
                );
            return RedirectToAction("Index/" + forumThreadID);
            
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
