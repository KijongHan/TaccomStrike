using System.Collections.Generic;
using System.Security.Claims;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameUserEntity {

        public ClaimsPrincipal UserPrincipal {get;set;}

        public List<GameCardEntity> Hand {get;set;}

        public GameUserEntity(ClaimsPrincipal userPrincipal, List<GameCardEntity> hand) {
            UserPrincipal = userPrincipal;
            Hand = hand;
        }
    }
}