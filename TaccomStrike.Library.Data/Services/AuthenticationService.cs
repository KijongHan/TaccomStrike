using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using TaccomStrike.Library.Data.DAL;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services
{
    public class AuthenticationService
    {
        private readonly UserLoginRepository userRepository;
        private readonly ForumUserRepository forumUserRepository;

        public AuthenticationService(UserLoginRepository userRepository, ForumUserRepository forumUserRepository)
        {
            this.userRepository = userRepository;
            this.forumUserRepository = forumUserRepository;
        }

        public CreateUserLogin CreateLogin(CreateUserLogin userEntity)
        {
            if(userRepository.GetUserLogin(userEntity.Username) != null)
            {
                return null;
            }

            string passwordSalt = Authentication.GenerateSalt();
            string hashPassword = Authentication.HashPassword(userEntity.Password, passwordSalt);

            var forumUserID = forumUserRepository.CreateForumUser();
            userRepository.CreateUserLogin(userEntity, passwordSalt, hashPassword, forumUserID);
            return userEntity;
        }

        public ClaimsPrincipal AuthenticateLogin(PostUserLogin loginEntity)
        {
            var user = userRepository.GetUserLogin(loginEntity.Username);

            if(user == null)
            {
                return null;
            }

            if (!Authentication.AuthenticateLoginCredentials(user.PasswordSalt, loginEntity.Password, user.PasswordHash))
            {
                return null;
            }

            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, user.Username) };
            var claimsIdentity = new ClaimsIdentity(claims);
            return new ClaimsPrincipal(claimsIdentity);
        }
    }
}
