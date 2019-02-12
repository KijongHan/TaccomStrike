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
		private readonly UserConnectionsService userConnectionsService;
		private object authenticationServiceLock;

		public UserAuthenticationService(
			UserLoginRepository userRepository, 
			ForumUserRepository forumUserRepository,
			UserConnectionsService userConnectionsService)
		{
			authenticationServiceLock = new object();
			this.userConnectionsService = userConnectionsService;
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

		public Task<CreateUserLogin> CreateLoginAsync(CreateUserLogin userEntity)
		{
			lock(authenticationServiceLock) {
				return Task.Run(() => {
					if(userRepository.GetUserLogin(userEntity.Username) != null)
					{
						return null;
					}
					if(userRepository.GetUserLoginByEmail(userEntity.Email) != null)
					{
						return null;
					}

					string passwordSalt = Authentication.GenerateSalt();
					string hashPassword = Authentication.HashPassword(userEntity.Password, passwordSalt);

					var forumUserID = forumUserRepository.CreateForumUser();
					userRepository.CreateUserLogin(userEntity, passwordSalt, hashPassword, forumUserID);
					return userEntity;
				});
			}
		}

		public Task<ClaimsPrincipal> AuthenticateLoginAsync(PostUserLogin loginEntity)
		{
			lock(authenticationServiceLock)
			{
				return Task.Run(() => {
					var user = userRepository.GetUserLogin(loginEntity.Username);
					
					if(user == null)
					{
						return null;
					}

					if(userConnectionsService.GameConnectionService.GetConnection(user.UserLoginID)!=null
					|| userConnectionsService.ChatConnectionService.GetConnection(user.UserLoginID) != null)
					{
						return null;
					}

					if (!Authentication.AuthenticateLoginCredentials(user.PasswordSalt, loginEntity.Password, user.PasswordHash))
					{
						return null;
					}

					return GetClaimsPrincipal(user.UserLoginID);
				});
			}
		}

		public ClaimsPrincipal GetClaimsPrincipal(int id) 
		{
			var user = userRepository.GetUserLogin(id);

			if(user == null)
			{
				return null;
			}

			var claims = new List<Claim>() 
			{ 
				new Claim(Security.UserNameClaim, user.Username),
				new Claim(Security.UserLoginIDClaim, user.UserLoginID.ToString())
			};
			var claimsIdentity = new ClaimsIdentity(claims, Security.AuthenticationScheme);
			return new ClaimsPrincipal(claimsIdentity);
		}
	}
}
