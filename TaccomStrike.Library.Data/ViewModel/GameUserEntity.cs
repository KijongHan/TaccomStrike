using System.Collections.Generic;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.ViewModel {
    public class GameUserEntity {

        public GameUser GameUser {get;set;}

        public GameUserState GameUserState {get;set;}

        public List<GameCardEntity> Hand {get;set;}

        public List<GameCardEntity> Deck {get;set;}

        public List<GameCardEntity> ManaZone {get;set;}

        public List<GameCardEntity> BattleZone {get;set;}

        public List<GameCardEntity> SpellZone {get;set;}

        public List<GameCardEntity> Grave {get;set;}

    }
}
