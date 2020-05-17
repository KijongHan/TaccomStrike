using System;

namespace CallCheatOnline.Library.Data.Model
{
	public class AppSettingItem
	{
		public int AppSettingItemID {get;set;}

		public int AppSettingProgramID {get;set;}
		public AppSettingProgram AppSettingProgram { get; set; }

		public string Environment {get;set;}

		public string Key {get;set;}

		public string Value {get;set;}
	}
}