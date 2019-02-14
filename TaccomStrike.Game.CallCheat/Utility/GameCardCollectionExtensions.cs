using System.Collections.Generic;
using System.Linq;

namespace TaccomStrike.Game.CallCheat.Utilty
{
	public static class GameCardCollectionExtensions
	{
		public static IEnumerable<GameCard> OrderByRank(this IEnumerable<GameCard> cards)
		{
			return cards.OrderBy((item) => item, new GameCardRankComparer());
		}
	}

	public class GameCardRankComparer : IComparer<GameCard>
	{
		public int Compare(GameCard x, GameCard y)
		{
			int xIndex = GameCard.Ranks.FindIndex(item => item==x.Rank);
			int yIndex = GameCard.Ranks.FindIndex(item => item==y.Rank);

			return xIndex.CompareTo(yIndex);
		}
	}
}