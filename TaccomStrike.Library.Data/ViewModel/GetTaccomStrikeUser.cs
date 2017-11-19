using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Library.Data.ViewModel
{
    public class GetTaccomStrikeUser
    {
        public string Username { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
    }
}
