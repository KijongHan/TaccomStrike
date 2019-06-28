using System;
using System.Collections.Generic;

namespace CallCheatOnline.Library.Data.Model
{
	public class AppSettingProgram
	{
		public int AppSettingProgramID {get;set;}

		public string ProgramName {get;set;}
		
		public string AppConfigFilePath {get;set;}

		public List<AppSettingItem> AppSettingItems { get; set; }
	}
}