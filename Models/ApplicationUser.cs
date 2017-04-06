using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AvaNet.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        [StringLength(25)]
        public string GameUserID { get; set; }
        public GameUser GameUser { get; set; }

        public string AvatarImageURL { get; set; }

        public ICollection<ForumThread> ForumThreads { get; set; }
        public ICollection<ForumComment> ForumComments { get; set; }

    }
}
