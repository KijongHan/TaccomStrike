using System;
using System.Collections.Generic;
using System.Text;
using CallCheatOnline.Game.CallCheat;
using CallCheatOnline.Library.Data.ViewModel;

namespace CallCheatOnline.Library.Data.ApiEntities
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
