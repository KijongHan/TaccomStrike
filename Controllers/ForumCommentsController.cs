using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AvaNet.Models;
using Microsoft.AspNetCore.Identity;
using AvaNet.DataAccessLayer;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumCommentsController : Controller
    {

        private readonly UserManager<ApplicationUser> userManager;

        private readonly IForumCommentRepository forumCommentRepository;

        private readonly IForumLikeRepository forumLikeRepository;

        public ForumCommentsController(UserManager<ApplicationUser> userManager, IForumCommentRepository forumCommentRepository, IForumLikeRepository forumLikeRepository)
        {
            this.userManager = userManager;
            this.forumCommentRepository = forumCommentRepository;
            this.forumLikeRepository = forumLikeRepository;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Like(IFormCollection formData)
        {
            int formDataWeight = Convert.ToInt32(formData.First(t => t.Key.Equals("Weight")).Value);
            int formDataCommentID = Convert.ToInt32(formData.First(t => t.Key.Equals("ForumCommentID")).Value);

            //Parameters for redirecting to back to the previous URL 
            string formDataThreadID = formData.First(t => t.Key.Equals("ForumThreadID")).Value;
            string formStartIndex = formData.First(t => t.Key.Equals("StartIndex")).Value;
            string formOrderBy = formData.First(t => t.Key.Equals("OrderBy")).Value;

            ForumLike forumLike = new ForumLike { Weight=formDataWeight };

            //Not in the boundary of like weightings
            if (forumLike.Weight < -1 && forumLike.Weight > 1)
            {
                return null;
            }

            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumComment forumComment = forumCommentRepository.Find(formDataCommentID, true);

            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumLike fl in forumComment.ForumLikes)
            {
                if (fl.ApplicationUser.Id.Equals(user.Id))
                {
                    if (forumLike.Weight == formDataWeight)
                    {
                        return Redirect("/ForumThreads/Details/" + formDataThreadID + "?startIndex=" + formStartIndex + "&orderBy=" + formOrderBy);
                    }
                    //Different like weight for the user, update the like
                    else
                    {
                        //Remove the forum like if user inputted likeweight neutral
                        if (formDataWeight == 0)
                        {
                            forumComment.ForumLikes.Remove(fl);
                        }
                        else
                        {
                            fl.Weight = formDataWeight;
                        }

                        forumCommentRepository.Update(forumComment);
                        return Redirect("/ForumThreads/Details/" + formDataThreadID + "?startIndex=" + formStartIndex + "&orderBy=" + formOrderBy);
                    }
                }
            }

            //This user has not liked this comment before
            forumLike.ApplicationUser = user;
            forumComment.ForumLikes.Add(forumLike);
            forumCommentRepository.Update(forumComment);
            return Redirect("/ForumThreads/Details/" + formDataThreadID + "?startIndex=" + formStartIndex + "&orderBy=" + formOrderBy);
        }

        //Called when after logging in when the user was formerly not logged in while commenting
        public IActionResult Create()
        {
            return Redirect("/");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create(IFormCollection formData)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();

            //Set comment creator
            ForumComment forumComment = new ForumComment { Content = formData.First(t => t.Key == "Content").Value };
            forumComment.ApplicationUser = user;
            forumComment.ForumCommentCreationTime = DateTime.UtcNow; 
            forumCommentRepository.Add(forumComment);

            return Redirect("/ForumThreads/Details/" + formData.First(t => t.Key=="ForumThreadID").Value);
        }

        [Authorize]
        public async Task<IActionResult> Delete(int ID, int forumThreadID)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumComment forumComment = forumCommentRepository.Find(ID, true);

            //In case mal-intended delete request got through
            if(!user.Id.Equals(forumComment.ApplicationUser.Id))
            {
                return null;
            }

            forumComment.IsDeleted = true;
            forumCommentRepository.Update(forumComment);
            return Redirect("/ForumThreads/Details/" + forumThreadID);
        }

        [Authorize(Roles = "Administrator,Moderator")]
        public async Task<IActionResult> Ban(int ID, int forumThreadID)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumComment forumComment = forumCommentRepository.Find(ID, true);

            forumComment.IsBanned = true;
            forumCommentRepository.Update(forumComment);
            return Redirect("/ForumThreads/Details/" + forumThreadID);
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}
