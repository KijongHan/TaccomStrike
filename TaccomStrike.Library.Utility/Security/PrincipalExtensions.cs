using System.Security.Claims;

public static class PrincipalExtensions {

    public static int GetUserID(this ClaimsPrincipal principal) {
        foreach(Claim claim in principal.Claims) {
            if(claim.Type == ClaimTypes.NameIdentifier) {
                return int.Parse(claim.Value);
            }
        }
        return 0;
    }

}