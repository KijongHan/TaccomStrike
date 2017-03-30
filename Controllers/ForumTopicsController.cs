using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AvaNet.DataAccessLayer;
using AvaNet.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumTopicsController : Controller
    {
        private readonly IForumTopicRepository forumTopicRepository;

        private readonly IForumThreadRepository forumThreadRepository;

        public ForumTopicsController(IForumTopicRepository forumTopicRepository, IForumThreadRepository forumThreadRepository)
        {
            this.forumTopicRepository = forumTopicRepository;
            this.forumThreadRepository = forumThreadRepository;
        }

        public IActionResult Index()
        {
            ViewData["Message"] = "This is the forum page";

            return View(forumTopicRepository.GetAll());
        }

        public IActionResult Details(int ID)
        {
            //Retrieve the forum topic corresponding to id
            ForumTopic forumTopic = forumTopicRepository.Find(ID);
            return View(forumTopic);
        }
    }
}
