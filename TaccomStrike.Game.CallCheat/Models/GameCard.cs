using System.Collections.Generic;
using System.Linq;

namespace TaccomStrike.Game.CallCheat
{
	public class GameCard
	{
		public static List<string> Suits = new List<string>
		{
			"Heart", "Diamond", "Clover", "Spade"
		};

		public static List<string> Ranks = new List<string>
		{
			"2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"
		};

		public string Suit {get;set;}

		public string Rank {get;set;}

		public GameCard() {}

		public GameCard(string rank, string suit)
		{
			Suit = suit;
			Rank = rank;
		}

		public override bool Equals(object obj)
		{
			if (obj == null || GetType() != obj.GetType())
			{
				return false;
			}

			GameCard c = (GameCard)obj;
			return (Suit==c.Suit) && (Rank==c.Rank);
		}
	}
}