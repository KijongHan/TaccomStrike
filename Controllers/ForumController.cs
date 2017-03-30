using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AvaNet.DataAccessLayer;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class ForumController : Controller
    {
        private readonly IForumTopicRepository forumTopicRepository;

        public ForumController(IForumTopicRepository forumTopicRepository)
        {
            this.forumTopicRepository = forumTopicRepository;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewData["Message"] = "This is the forum page";

            return View(forumTopicRepository.GetAll());
        }
    }
}
