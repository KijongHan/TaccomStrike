using System.Collections.Generic;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameState {

        public List<GameCardEntity> Hand {get;set;}
        public List<List<GameCardEntity>> Claims {get;set;}

    }
}
