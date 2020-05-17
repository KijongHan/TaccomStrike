using System;
using System.Collections.Generic;
using System.Linq;

namespace CallCheatOnline.Game.CallCheat
{
	public class GameCard
	{
		public static List<string> Suits = new List<string>
		{
			"Heart", "Diamond", "Clover", "Spade"
		};

		public static List<string> Ranks = new List<string>
		{
			"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
		};

		public string Suit {get;set;}

		public string Rank {get;set;}

		public GameCard() {}

		public GameCard(string rank, string suit)
		{
			Suit = suit;
			Rank = rank;
		}
	}

	public class GameCardRankComparer : Comparer<GameCard>
	{
		public override int Compare(GameCard x, GameCard y)
		{
			var xRankIndex = GameCard
				.Ranks
				.FindIndex((item) =>
				{
					return item == x.Rank;
				});
			var yRankIndex = GameCard
				.Ranks
				.FindIndex((item) =>
				{
					return item == y.Rank;
				});
			var rankComparison = xRankIndex.CompareTo(yRankIndex);

			if(rankComparison == 0)
			{
				var xSuitIndex = GameCard
					.Suits
					.FindIndex((item) =>
					{
						return item == x.Suit;
					});
				var ySuitIndex = GameCard
					.Suits
					.FindIndex((item) =>
					{
						return item == y.Suit;
					});
				return xSuitIndex.CompareTo(ySuitIndex);
			}
			return rankComparison;
		}
	}
}