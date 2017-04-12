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
using AvaNet.Models.ViewModels.ForumViewModels;
using System.Net.Http;
using System.Net;
using System.Web.Http;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumThreadsController : Controller
    {

        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumTopicRepository forumTopicRepository;

        private readonly IForumLikeRepository forumLikeRepository;

        private readonly IPinnedForumThreadsRepository pinnedForumThreadsRepository;

        private readonly UserManager<ApplicationUser> userManager;

        private readonly HtmlSanitizer htmlSanitizer;

        public ForumThreadsController(HtmlSanitizer htmlSanitizer, IPinnedForumThreadsRepository pinnedForumThreadsRepository, IForumLikeRepository forumLikeRepository, IForumTopicRepository forumTopicRepository, IForumThreadRepository forumThreadRepository, UserManager<ApplicationUser> userManager)
        {
            this.pinnedForumThreadsRepository = pinnedForumThreadsRepository;
            this.forumThreadRepository = forumThreadRepository;
            this.forumTopicRepository = forumTopicRepository;
            this.forumLikeRepository = forumLikeRepository;
            this.userManager = userManager;
            this.htmlSanitizer = htmlSanitizer;
        }

        public IActionResult NavigateThreads(int ID, int startIndex, string orderBy)
        {
            ForumTopic forumTopic = forumTopicRepository.Find(ID, true);
            int updatedStartIndex = ForumThreadsIndexViewModel.GetStartIndex(startIndex, forumTopic.ForumThreads.Count);
            return Redirect("/ForumThreads/Index/" + ID + "?startIndex=" + updatedStartIndex + "&orderBy=" + orderBy);
        }

        public IActionResult NavigateComments(int ID, int startIndex, string orderBy)
        {
            ForumThread forumThread = forumThreadRepository.Find(ID, true);
            int updatedStartIndex = ForumThreadsIndexViewModel.GetStartIndex(startIndex, forumThread.ForumComments.Count);
            return Redirect("/ForumThreads/Details/" + ID + "?startIndex=" + updatedStartIndex + "&orderBy=" + orderBy);
        }

        public IActionResult Index(int ID, int startIndex, string orderBy)
        {
            ForumTopic forumTopic = forumTopicRepository.Find(ID, true);
            PinnedForumThreads pinnedForumThreads = pinnedForumThreadsRepository.Find(true);

            ForumThreadsIndexViewModel viewModel = new ForumThreadsIndexViewModel();
            viewModel.ForumTopicID = forumTopic.ForumTopicID;
            viewModel.ForumTopicTitle = forumTopic.Title;
            viewModel.PinnedForumThreads = pinnedForumThreads;

            //Set URL parameter values
            viewModel.StartIndex = startIndex;
            viewModel.OrderBy = orderBy;

            //Check to see if the user has altered the query parameter.
            if (startIndex % ForumThreadsIndexViewModel.NUMBER_OF_THREADS_PER_PAGE != 0)
            {
                return Redirect("/ForumThreads/Index/" + ID + "?startIndex=0&orderBy=newest"); 
            }
            if (!ForumThreadsIndexViewModel.IsStartIndexInRange(startIndex, forumTopic.ForumThreads.Count))
            {
                return Redirect("/ForumThreads/Index/" + ID + "?startIndex=0&orderBy=newest");
            }
            
            //No current user input of how to order threads
            if (orderBy == null)
            {
                viewModel.ForumThreads = forumTopic.ForumThreads
                    .OrderByDescending(t => t.ForumThreadCreationTime)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsIndexViewModel.NUMBER_OF_THREADS_PER_PAGE);
            }
            else if (orderBy.Equals("mostLikes"))
            {
                viewModel.ForumThreads = forumTopic.ForumThreads
                    .OrderByDescending(t => t.ForumLikes.Sum(e => e.Weight))
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsIndexViewModel.NUMBER_OF_THREADS_PER_PAGE);
            }
            else if (orderBy.Equals("mostComments"))
            {
                viewModel.ForumThreads = forumTopic.ForumThreads
                    .OrderByDescending(t => t.ForumComments.Count)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsIndexViewModel.NUMBER_OF_THREADS_PER_PAGE);
            }
            else if (orderBy.Equals("newest"))
            {
                viewModel.ForumThreads = forumTopic.ForumThreads
                    .OrderByDescending(t => t.ForumThreadCreationTime)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsIndexViewModel.NUMBER_OF_THREADS_PER_PAGE);
            }
            
            return View(viewModel);
        }

        // GET: /<controller>/
        public IActionResult Details(int ID, int startIndex, string orderBy)
        {
            ForumThread forumThread = forumThreadRepository.Find(ID, true);

            //Check to see if the user has altered the query parameter.
            if (startIndex % ForumThreadsDetailsViewModel.NUMBER_OF_COMMENTS_PER_PAGE != 0)
            {
                return Redirect("/ForumThreads/Details/" + ID + "?startIndex=0&orderBy=newestComments");
            }
            if (!ForumThreadsDetailsViewModel.IsStartIndexInRange(startIndex, forumThread.ForumComments.Count))
            {
                return Redirect("/ForumThreads/Details/" + ID + "?startIndex=0&orderBy=oldestComments");
            }

            ForumThreadsDetailsViewModel viewModel = new ForumThreadsDetailsViewModel();
            viewModel.ForumThread = forumThread;
            viewModel.StartIndex = startIndex;
            viewModel.OrderBy = orderBy;

            if (orderBy == null)
            {
                viewModel.ForumThread.ForumComments = viewModel.ForumThread.ForumComments
                    .OrderBy(t => t.ForumCommentCreationTime)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsDetailsViewModel.NUMBER_OF_COMMENTS_PER_PAGE)
                    .ToList();
            }
            else if (orderBy.Equals("oldestComments"))
            {
                viewModel.ForumThread.ForumComments = viewModel.ForumThread.ForumComments
                    .OrderBy(t => t.ForumCommentCreationTime)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsDetailsViewModel.NUMBER_OF_COMMENTS_PER_PAGE)
                    .ToList();
            }
            else if (orderBy.Equals("newestComments"))
            {
                viewModel.ForumThread.ForumComments = viewModel.ForumThread.ForumComments
                    .OrderByDescending(t => t.ForumCommentCreationTime)
                    .Skip(viewModel.StartIndex)
                    .Take(ForumThreadsDetailsViewModel.NUMBER_OF_COMMENTS_PER_PAGE)
                    .ToList();
            }

            return View(viewModel);
        }

        //Called when the user is not logged in
        public IActionResult Create()
        {
            return Redirect("/");
        }
        
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Title, Content, ForumTopicID")] ForumThread forumThread)
        {
            //Convert any new line characters.
            forumThread.Content = forumThread.Content.Replace("\r\n", "<br />");

            //Security check, allow desired html tags and remove malicious ones
            forumThread.Content = htmlSanitizer.RemoveUnwantedTags(forumThread.Content);
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            
            //Set creator of forum thread
            forumThread.ApplicationUser = user;
            forumThread.ForumThreadCreationTime = DateTime.UtcNow;
            forumThreadRepository.Add(forumThread);

            return Redirect("/ForumThreads/Details/" + forumThread.ForumThreadID);
        }

        [Authorize(Roles = "Administrator,Moderator")]
        public async Task<IActionResult> Ban(int ID)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            ForumThread forumThread = forumThreadRepository.Find(ID, false);

            forumThread.IsBanned = true;
            forumThreadRepository.Update(forumThread);
            return Redirect("/ForumThreads/Index/");
        }

        [Authorize(Roles = "Administrator,Moderator")]
        public async Task<IActionResult> Remove(int ID)
        {
            // Generate the token and send it
            ApplicationUser user = await GetCurrentUserAsync();
            forumThreadRepository.Remove(ID);
            return Redirect("/");
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}
