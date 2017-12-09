using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{    
    [Table("Session", Schema="app")]
    public class Session {

        [Key, Column("SessionID")]
        public int SessionID {get;set;}

        [Column("UseLoginID")]
        public int UserLoginID {get;set;}

        [Column("ProtectedSessionID")]
        public string ProtectedSessionID {get;set;}

        [Column("UnprotectedSessionID")]
        public string UnprotectedSessionID {get;set;}

        [Column("WhenCreated")]
        public DateTime WhenCreated {get;set;}

        [Column("WhenBanned")]
        public DateTime WhenBanned {get;set;}

    }
}