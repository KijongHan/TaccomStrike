using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CallCheatOnline.Library.Data.Model
{
	public class AppException
	{
		public int AppExceptionID {get;set;}

		public string Message {get;set;}

		public string StackTrace {get;set;}

		public string ExceptionString {get;set;}

		public DateTime? WhenCreated {get;set;}
	}
}