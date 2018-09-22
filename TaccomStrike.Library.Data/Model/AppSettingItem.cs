using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model
{
	[Table("AppSettingItem", Schema="app")]
	public class AppSettingItem
	{
		[Key, Column("AppSettingItemID")]
		public int AppSettingItemID {get;set;}

		[Column("AppSettingProgramID")]
		public int AppSettingProgramID {get;set;}

		[Column("Environment")]
		public string Environment {get;set;}

		[Column("Key")]
		public string Key {get;set;}

		[Column("Value")]
		public string Value {get;set;}
	}
}