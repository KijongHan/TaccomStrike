using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;
using System.Security.Claims;

public static class PrincipalExtensions {

    public static UserEntity GetUserEntity(this ClaimsPrincipal principal) {
        UserEntity userEntity = new UserEntity();
        return userEntity;
    }

}