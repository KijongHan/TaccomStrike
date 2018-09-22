using System;
using System.Collections.Generic;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.ApiEntities
{
	public class GetGameCard
	{
		public string Suit { get; set; }

		public string Rank { get; set; }

		public GetGameCard() { }

		public GetGameCard(GameCard gameCard)
		{
			Suit = gameCard.Suit;
			Rank = gameCard.Rank;
		}
	}
}
