using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class ApplicationUsersFriendship
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ApplicationUsersFriendshipID { get; set; }
        
        public ApplicationUser ApplicationUser { get; set; }
        
        public ApplicationUser ApplicationUserFriend { get; set; }
    }
}
