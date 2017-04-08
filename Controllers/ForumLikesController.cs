using AvaNet.DataAccessLayer;
using AvaNet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Controllers
{
    public class ForumLikesController : Controller
    {
        private readonly IForumLikeRepository forumLikeRepository;

        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumCommentRepository forumCommentRepository;

        private UserManager<ApplicationUser> userManager;

        public ForumLikesController(
            IForumLikeRepository forumLikeRepository, 
            IForumThreadRepository forumThreadRepository, 
            IForumCommentRepository forumCommentRepository, 
            UserManager<ApplicationUser> userManager)
        {
            this.forumCommentRepository = forumCommentRepository;
            this.forumLikeRepository = forumLikeRepository;
            this.forumThreadRepository = forumThreadRepository;
            this.userManager = userManager;
        }

        //Called when the user is not logged in
        public IActionResult Create()
        {
            return Redirect("/");
        }

        //Method called when the user has presedd a like/dislike/neutral button
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(IFormCollection formData)
        {
            int formDataWeight = Convert.ToInt32(formData.First(t => t.Key.Equals("Weight")).Value);

            //Not in the boundary of like weightings
            if (formDataWeight < -1 && formDataWeight > 1)
            {
                return null;
            }

            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumLike forumLike = new ForumLike { Weight = formDataWeight, ApplicationUser = user };

            //URL elements in the form
            //Parameters for redirecting to back to the previous URL 
            string formDataThreadID = formData.First(t => t.Key.Equals("ForumThreadID")).Value;
            string formStartIndex = formData.First(t => t.Key.Equals("StartIndex")).Value;
            string formOrderBy = formData.First(t => t.Key.Equals("OrderBy")).Value;
            string returnURL = "/ForumThreads/Details/" + formDataThreadID + "?startIndex=" + formStartIndex + "&orderBy=" + formOrderBy;

            if (formData.ContainsKey("ForumThreadID"))
            {
                ProcessForumThreadLike(formData, forumLike);
            }
            if (formData.ContainsKey("ForumCommentID"))
            {
                ProcessForumCommentLike(formData, forumLike);
            }

            return Redirect(returnURL);
        }

        public void ProcessForumCommentLike(IFormCollection formData, ForumLike forumLike)
        {
            int forumCommentID = Convert.ToInt32(formData.First(t => t.Key.Equals("ForumCommentID")).Value);
            ForumComment forumComment = forumCommentRepository.Find(forumCommentID, true);

            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumLike fl in forumComment.ForumLikes)
            {
                if (fl.ApplicationUser.Id.Equals(forumLike.ApplicationUser.Id))
                {
                    if (fl.Weight == forumLike.Weight)
                    {
                        return;
                    }

                    //Different like weight for the user, update the like
                    else
                    {
                        if (forumLike.Weight == 0)
                        {
                            forumComment.ForumLikes.Remove(fl);
                        }

                        else
                        {
                            fl.Weight = forumLike.Weight;
                        }

                        forumCommentRepository.Update(forumComment);
                        return;
                    }
                }
            }

            forumComment.ForumLikes.Add(forumLike);
            forumCommentRepository.Update(forumComment);
            return;
        }

        public void ProcessForumThreadLike(IFormCollection formData, ForumLike forumLike)
        {
            int forumThreadID = Convert.ToInt32(formData.First(t => t.Key.Equals("ForumThreadID")).Value);
            ForumThread forumThread = forumThreadRepository.Find(forumThreadID, true);

            //Check if user hasnt already pressed a like for this, and if it is different from one specified
            foreach (ForumLike fl in forumThread.ForumLikes)
            {
                if (fl.ApplicationUser.Id.Equals(forumLike.ApplicationUser.Id))
                {
                    if (fl.Weight == forumLike.Weight)
                    {
                        return;
                    }

                    //Different like weight for the user, update the like
                    else
                    {
                        if (forumLike.Weight == 0)
                        {
                            forumThread.ForumLikes.Remove(fl);
                        }

                        else
                        {
                            fl.Weight = forumLike.Weight;
                        }

                        forumThreadRepository.Update(forumThread);
                        return;
                    }
                }
            }

            forumThread.ForumLikes.Add(forumLike);
            forumThreadRepository.Update(forumThread);
            return;
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }

    }
}
