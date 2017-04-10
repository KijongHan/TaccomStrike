using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models.ViewModels.AccountViewModels
{
    public class ProfileViewModel
    {
        public string UserID { get; set; }

        public string GameUserID { get; set; }

        public string AvatarImageURL { get; set; }

        public IList<string> Privileges { get; set; }
    }
}
