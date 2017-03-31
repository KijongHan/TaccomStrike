using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ApplicationUsersFriendships
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ApplicationUsersFriendshipsID { get; set; }

        public int ApplicationUserID { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        [ForeignKey("ApplicationUserFriend")]
        public int ApplicationUserFriendID { get; set; }
        public ApplicationUser ApplicationUserFriend { get; set; }
    }
}
