using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("UserLogin", Schema="auth")]
public class UserLogin 
{

	[Key, Column("UserLoginID")]
	public int UserLoginID {get;set;}

	[Column("Username")]
	public string Username {get;set;}

	[Column("Email")]
	public string Email {get;set;}

	[Column("PasswordHash")]
	public string PasswordHash {get;set;}

	[Column("PasswordSalt")]
	public string PasswordSalt {get;set;}

	[Column("WhenCreated")]
	public DateTime? WhenCreated {get;set;}

	[Column("WhenDeleted")]
	public DateTime? WhenDeleted {get;set;}

	[Column("ForumUserID")]
	public int ForumUserID {get;set;}

}