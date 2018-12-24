using System;
using System.Security.Claims;

namespace TaccomStrike.Library.Utility.Security {
	public static class PrincipalExtensions {

		public static int GetUserLoginID(this ClaimsPrincipal principal)
		{
			foreach(Claim claim in principal.Claims) {
				if(claim.Type == Security.UserLoginIDClaim) {
					return int.Parse(claim.Value);
				}
			}
			return 0;
		}

		public static string GetUserName(this ClaimsPrincipal principal)
		{
			foreach(Claim claim in principal.Claims) {
				if(claim.Type == Security.UserNameClaim) {
					return claim.Value;
				}
			}
			return "";
		}

		public static long? GetCurrentGameLobbyID(this ClaimsPrincipal principal)
		{
			foreach(Claim claim in principal.Claims) {
				if(claim.Type == Security.CurrentGameLobbyIDClaim) {
					return Convert.ToInt64(claim.Value);
				}
			}
			return null;
		}

		public static void SetCurrentGameLobbyID(this ClaimsPrincipal principal, long? currentGameLobbyID)
		{
			ClaimsIdentity identity = (ClaimsIdentity)principal.Identity;
			if(principal.GetCurrentGameLobbyID()!=null)
			{
				foreach(Claim claim in principal.Claims)
				{
					if(claim.Type == Security.CurrentGameLobbyIDClaim)
					{
						identity.RemoveClaim(claim);
						break;
					}
				}
			}
			identity.AddClaim(new Claim(Security.CurrentGameLobbyIDClaim, currentGameLobbyID.ToString()));
		}
	}
}

