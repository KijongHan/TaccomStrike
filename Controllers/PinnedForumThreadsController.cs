using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AvaNet.DataAccessLayer;
using AvaNet.Models;
using AvaNet.Models.ViewModels.ForumViewModels;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class PinnedForumThreadsController : Controller
    {
        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumTopicRepository forumTopicRepository;

        private readonly IPinnedForumThreadsRepository pinnedForumThreadsRepository;

        public PinnedForumThreadsController(IForumThreadRepository forumThreadRepository, IForumTopicRepository forumTopicRepository, IPinnedForumThreadsRepository pinnedForumThreadsRepository)
        {
            this.forumThreadRepository = forumThreadRepository;
            this.forumTopicRepository = forumTopicRepository;
            this.pinnedForumThreadsRepository = pinnedForumThreadsRepository;
        }

        // GET: /<controller>/
        [Authorize(Roles = "Administrator,Moderator")]
        public IActionResult Edit()
        {
            ForumTopic forumTopic = forumTopicRepository.Find("Game News and Updates", true);
            PinnedForumThreads pinnedForumThreads = pinnedForumThreadsRepository.Find();
            PinnedForumThreadsEditViewModel viewModel = new PinnedForumThreadsEditViewModel { ForumTopic=forumTopic, PinnedForumThreads=pinnedForumThreads };

            return View(viewModel);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Moderator")]
        public IActionResult Edit(IFormCollection formData)
        {
            PinnedForumThreads pinnedForumThreads = pinnedForumThreadsRepository.Find();

            List<string> selectedForumThreadsIDs = formData.Where(t => t.Key == "forumThreads")
                .ElementAt(0)
                .Value
                .ToList();

            foreach (string forumThreadID in selectedForumThreadsIDs)
            {
                ForumThread forumThread = forumThreadRepository.Find(Convert.ToInt32(forumThreadID), false);
                pinnedForumThreads.ForumThreads.Add(forumThread);
            }

            pinnedForumThreadsRepository.Update(pinnedForumThreads);
            return RedirectToAction("Edit");
        }

    }
}
