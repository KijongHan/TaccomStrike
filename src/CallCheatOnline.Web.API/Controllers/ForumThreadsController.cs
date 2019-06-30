using CallCheatOnline.Library.Data.DAL;
using CallCheatOnline.Library.Data.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CallCheatOnline.Web.API.Controllers
{
	[Route("api/forumthreads")]
	public class ForumThreadsController : Controller
	{
		private ForumThreadRepository forumThreadRepository;

		public ForumThreadsController(ForumThreadRepository forumThreadRepository)
		{
			this.forumThreadRepository = forumThreadRepository;
		}

		[HttpGet]
		public List<GetForumThread> GetForumThreads()
		{
			var forumThreads = forumThreadRepository.GetForumThreads();
			return forumThreads;
		}
	}
}
 