using System.Collections.Generic;
using System.Linq;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.Utilty {
    
    public static class GameCardCollectionExtensions {

        public static IEnumerable<GameCardEntity> OrderByRank(this IEnumerable<GameCardEntity> cards) {
            return cards.OrderBy((item) => item, new GameCardRankComparer());
        }
    }

    public class GameCardRankComparer : IComparer<GameCardEntity> {

        public int Compare(GameCardEntity x, GameCardEntity y) {
            int xIndex = GameCardEntity.Ranks.FindIndex(item => item==x.Rank);
            int yIndex = GameCardEntity.Ranks.FindIndex(item => item==y.Rank);

            return xIndex.CompareTo(yIndex);
        }

    }

}