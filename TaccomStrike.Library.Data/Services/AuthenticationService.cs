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
        private readonly TaccomStrikeUserRepository userRepository;

        public AuthenticationService(TaccomStrikeUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public CreateTaccomStrikeUser CreateLogin(CreateTaccomStrikeUser userEntity)
        {
            if(userRepository.GetTaccomStrikeUser(userEntity.Username) != null)
            {
                return null;
            }

            string passwordSalt = Authentication.GenerateSalt();
            string hashPassword = Authentication.HashPassword(userEntity.Password, passwordSalt);

            userRepository.CreateTaccomStrikeUser(userEntity, passwordSalt, hashPassword);
            return userEntity;
        }

        public ClaimsPrincipal AuthenticateLogin(LoginTaccomStrikeUser loginEntity)
        {
            var user = userRepository.GetTaccomStrikeUser(loginEntity.Username);

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
