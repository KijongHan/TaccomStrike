using System.Security.Claims;

namespace TaccomStrike.Library.Utility.Security {
    public static class PrincipalExtensions {

        public static int GetUserLoginID(this ClaimsPrincipal principal) {
            foreach(Claim claim in principal.Claims) {
                if(claim.Type == Security.UserLoginIDClaim) {
                    return int.Parse(claim.Value);
                }
            }
            return 0;
        }

        public static int GetGameUserID(this ClaimsPrincipal principal) {
            foreach(Claim claim in principal.Claims) {
                if(claim.Type == Security.GameUserIDClaim) {
                    return int.Parse(claim.Value);
                }
            }
            return 0;
        }

        public static string GetUserName(this ClaimsPrincipal principal) {
            foreach(Claim claim in principal.Claims) {
                if(claim.Type == Security.UserNameClaim) {
                    return claim.Value;
                }
            }
            return "";
        }
    }
}

