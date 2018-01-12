using System.Collections.Generic;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameState {

        public string CurrentTurnUserName {get;set;}
        public List<OpponentInformation> OpponentInformations {get;set;}
        public List<GameCardEntity> Hand {get;set;}
        public List<GameClaim> Claims {get;set;}

        public GameState() {
            OpponentInformations = new List<OpponentInformation>();
            Hand = new List<GameCardEntity>();
            Claims = new List<GameClaim>();
        }

    }

    public class OpponentInformation {

        public string UserName {get;set;}

        public int HandCount {get;set;}

    }
}
