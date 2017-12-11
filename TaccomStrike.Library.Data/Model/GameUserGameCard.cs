using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model {

    [Table("GameUserGameCard", Schema="game")]
    public class GameUserGameCard {

        [Column("GameUserID")]
        public int GameUserID { get; set; }

        [Column("GameCardID")]
        public int GameCardID { get; set; }

        [Column("WhenCreated")]
        public DateTime? WhenCreated {get;set;}

        [Column("WhenDeleted")]
        public DateTime? WhenDeleted {get;set;}

    }
}