using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CallCheatOnline.Library.Data.Model
{
	[Table("AppException", Schema="app")]
	public class AppException
	{
		[Key, Column("AppExceptionID")]
		public int AppExceptionID {get;set;}

		[Column("Message")]
		public string Message {get;set;}

		[Column("StackTrace")]
		public string StackTrace {get;set;}

		[Column("ExceptionString")]
		public string ExceptionString {get;set;}

		[Column("WhenCreated")]
		public DateTime? WhenCreated {get;set;}
	}
}