using AvaNet.DataAccessLayer;
using AvaNet.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Controllers
{
    public class ForumLikesController
    {
        private readonly IForumLikeRepository forumLikeRepository;

        private readonly IForumThreadRepository forumThreadRepository;

        private readonly IForumCommentRepository forumCommentRepository;

        private UserManager<ApplicationUser> userManager;

        public ForumLikesController(IForumLikeRepository forumLikeRepository)
        {

        }
    }
}
