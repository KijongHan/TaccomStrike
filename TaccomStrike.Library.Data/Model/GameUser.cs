using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model {

    [Table("GameUser", Schema="game")]
    public class GameUser {

        [Key, Column("GameUserID")]
        public int GameUserID { get; set; }

        [Column("GameUserName")]
        public string GameUserName { get; set; }

        [Column("WhenCreated")]
        public DateTime? WhenCreated {get;set;}

        [Column("WhenDeleted")]
        public DateTime? WhenDeleted {get;set;}

    }
}
