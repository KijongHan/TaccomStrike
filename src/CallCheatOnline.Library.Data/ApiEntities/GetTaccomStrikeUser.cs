using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.ViewModel
{
    public class GetCallCheatOnlineUser
    {
        public string Username { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
    }
}
