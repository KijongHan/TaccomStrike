using System.Collections.Generic;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameClaim {
        
        public List<GameCardEntity> Claims {get;set;}
        public List<GameCardEntity> Actual {get;set;}

        public GameClaim(List<GameCardEntity> claims, List<GameCardEntity> actual) {
            Claims = claims;
            Actual = actual;
        }

    }
}