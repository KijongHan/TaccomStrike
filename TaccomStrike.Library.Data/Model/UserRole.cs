using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaccomStrike.Library.Data.Model
{
    [Table("UserRole", Schema="auth")]
    public class UserRole 
    {
        [Key, Column("UserRoleID")]
        public int UserRoleID {get;set;}

        [Column("RoleName")]
        public string RoleName {get;set;}

        [Column("WhenCreated")]
        public DateTime? WhenCreated {get;set;}

        [Column("WhenDeleted")]
        public DateTime? WhenDeleted {get;set;}
    }
}