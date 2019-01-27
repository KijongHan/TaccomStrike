﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using TaccomStrike.Game.CallCheat;
using TaccomStrike.Library.Data.ApiEntities;

namespace TaccomStrike.Library.Data.Extensions
{
	public static class GameExtensions
	{
		public static List<GameCard> GetGameCards(this List<GetGameCard> getGameCards)
		{
			return getGameCards
				.Select(getGameCard => getGameCard.GetGameCard())
				.ToList();
		}

		public static GameCard GetGameCard(this GetGameCard getGameCard)
		{
			var gameCard = new GameCard();
			gameCard.Suit = getGameCard.Suit;
			gameCard.Rank = getGameCard.Rank;
			return gameCard;
		}
	}
}
