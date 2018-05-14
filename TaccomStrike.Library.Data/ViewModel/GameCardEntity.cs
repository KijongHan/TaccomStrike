using System.Collections.Generic;
using System.Linq;

namespace TaccomStrike.Library.Data.ViewModel {
	public class GameCardEntity {

		public static List<string> Suits = new List<string> {
			"Heart", "Diamond", "Clover", "Spade"
		};

		public static List<string> Ranks = new List<string> {
			"2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"
		};

		public string Suit {get;set;}

		public string Rank {get;set;}

		public GameCardEntity() {}

		public GameCardEntity(string rank, string suit) {
			Suit = suit;
			Rank = rank;
		}

		public override bool Equals(object obj) {
			if (obj == null || GetType() != obj.GetType()) {
				return false;
			}

			GameCardEntity c = (GameCardEntity)obj;
			return (Suit==c.Suit) && (Rank==c.Rank);
		}
	}
}