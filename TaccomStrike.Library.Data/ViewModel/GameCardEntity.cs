namespace TaccomStrike.Library.Data.ViewModel {
	public class GameCardEntity {

		public static string[] Suits = new string[] {
			"Heart", "Diamond", "Clover", "Spade"
		};

		public static string[] Ranks = new string[] {
			"2", "3", "4", "5", "6", "7", "8", "9", "Jack", "Queen", "King", "Ace"
		};

		public string Suit {get;set;}

		public string Rank {get;set;}

		public GameCardEntity(string rank, string suit) {
			Suit = suit;
			Rank = rank;
		}

	}
}