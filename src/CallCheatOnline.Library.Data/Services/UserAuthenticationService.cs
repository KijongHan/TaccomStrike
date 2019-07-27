using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using CallCheatOnline.Library.Data.DAL;
using CallCheatOnline.Library.Data.ApiEntities;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Library.Data.Services
{
	public class UserAuthenticationService
	{
		private readonly UserLoginRepository userRepository;
		private readonly GuestLoginRepository guestLoginRepository;
		private readonly ForumUserRepository forumUserRepository;
		private readonly UserConnectionsService userConnectionsService;
		private object authenticationServiceLock;

		public UserAuthenticationService(
			UserLoginRepository userRepository, 
			GuestLoginRepository guestLoginRepository,
			ForumUserRepository forumUserRepository,
			UserConnectionsService userConnectionsService)
		{
			authenticationServiceLock = new object();
			this.userConnectionsService = userConnectionsService;
			this.userRepository = userRepository;
			this.guestLoginRepository = guestLoginRepository;
			this.forumUserRepository = forumUserRepository;
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

					if(userConnectionsService.GameConnectionService.GetConnection(user.UserLoginID) != null
					|| userConnectionsService.ChatConnectionService.GetConnection(user.UserLoginID) != null)
					{
						return null;
					}

					if (!Authentication.AuthenticateLoginCredentials(user.PasswordSalt, loginEntity.Password, user.PasswordHash))
					{
						return null;
					}

					return GetClaimsPrincipal(user);
				});
			}
		}

		public Task<ClaimsPrincipal> AuthenticateGuestAsync(PostGuestLogin guestLogin) 
		{
			lock(authenticationServiceLock) 
			{
				return Task.Run(() => {
					if(guestLoginRepository.GetGuestLogins(guestLogin.Guestname).Count > 0) 
					{
						return null;
					}

					if(userRepository.GetUserLogin(guestLogin.Guestname) != null) 
					{
						return null;
					}

					var guestID = guestLoginRepository.CreateGuestLogin(guestLogin);
					return GetClaimsPrincipal(guestID, guestLogin.Guestname);
				});
			}
		}

		public ClaimsPrincipal GetClaimsPrincipal(int id, string guestname) 
		{
			var claims = new List<Claim>() 
			{ 
				new Claim(Security.UserNameClaim, guestname),
				new Claim(Security.UserLoginIDClaim, id.ToString())
			};
			var claimsIdentity = new ClaimsIdentity(claims, Security.AuthenticationScheme);
			return new ClaimsPrincipal(claimsIdentity);
		}

		public ClaimsPrincipal GetClaimsPrincipal(Model.UserLogin model) 
		{
			var user = userRepository.GetUserLogin(model.UserLoginID);

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
