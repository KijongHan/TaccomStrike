using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using TaccomStrike.Library.Data.DAL;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services
{
    public class UserAuthenticationService
    {
        private readonly UserLoginRepository userRepository;
        private readonly ForumUserRepository forumUserRepository;

        public UserAuthenticationService(UserLoginRepository userRepository, ForumUserRepository forumUserRepository)
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

        public async Task<CreateUserLogin> CreateLoginAsync(CreateUserLogin userEntity)
        {
            if(userRepository.GetUserLogin(userEntity.Username) != null)
            {
                return null;
            }

            string passwordSalt = await Authentication.GenerateSaltAsync();
            string hashPassword = await Authentication.HashPasswordAsync(userEntity.Password, passwordSalt);

            var forumUserID = await forumUserRepository.CreateForumUserAsync();
            await userRepository.CreateUserLoginAsync(userEntity, passwordSalt, hashPassword, forumUserID);
            return userEntity;
        }

        public async Task<ClaimsPrincipal> AuthenticateLoginAsync(PostUserLogin loginEntity)
        {
            var user = await userRepository.GetUserLoginAsync(loginEntity.Username);

            if(user == null)
            {
                return null;
            }

            if (!await Authentication.AuthenticateLoginCredentialsAsync(user.PasswordSalt, loginEntity.Password, user.PasswordHash))
            {
                return null;
            }

            return await GetClaimsPrincipalAsync(user.UserLoginID);
        }

        public async Task<ClaimsPrincipal> GetClaimsPrincipalAsync(int id) 
        {
            var user = await userRepository.GetUserLoginAsync(id);

            if(user == null)
            {
                return null;
            }

            var claims = new List<Claim>() 
            { 
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.UserLoginID.ToString())
            };
            var claimsIdentity = new ClaimsIdentity(claims);
            return new ClaimsPrincipal(claimsIdentity);
        }
    }
}
