using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model {

    [Table("GameCard", Schema="game")]
    public class GameCard {

        [Key, Column("GameCardID")]
        public int GameCardID { get; set; }

        [Column("CardName")]
        public string CardName { get; set; }

        [Column("CardEffectDescription")]
	    public string CardEffectDescription { get; set; }

        [Column("CardLoreDescription")]
        public string CardLoreDescription { get; set; }

        [Column("CardType")]
        public string CardType { get; set; }

        [Column("CardHealth")]
        public int CardHealth { get; set; }

        [Column("CardManaCost")]
        public int CardManaCost { get; set; }

        [Column("CardDamage")]
        public int CardDamage { get; set; }

    }
}
