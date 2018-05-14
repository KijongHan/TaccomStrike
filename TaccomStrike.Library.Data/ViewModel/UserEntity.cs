using System;
using System.Collections.Generic;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.ViewModel 
{
    public class UserEntity 
    {
        public UserLogin UserLogin {get;set;}

        public List<UserRole> UserRoles {get;set;}

        public ForumUser ForumUser {get;set;}

        public GameUser GameUser {get;set;}

        public UserEntity() 
        {
            UserRoles = new List<UserRole>();
        }
    }
}
