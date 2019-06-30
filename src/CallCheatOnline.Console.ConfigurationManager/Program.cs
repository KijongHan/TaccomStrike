using System;
using System.IO;
using System.Collections.Generic;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Data.DAL;
using Microsoft.EntityFrameworkCore;

namespace CallCheatOnline.Console.ConfigurationManager
{
	class Program
	{
		static void Main(string[] args)
		{
			var environment = args[0];
			var connString = args[1];

			var dbOptionsBuilder = new DbContextOptionsBuilder<CallCheatOnlineContext>();
			dbOptionsBuilder.UseSqlServer(connString);
			var dbContext = new CallCheatOnlineContext(dbOptionsBuilder.Options);

			var appSettingItemRepository = new AppSettingItemRepository(dbContext);
			var appSettingProgramRepository = new AppSettingProgramRepository(dbContext);

			var programs = appSettingProgramRepository.GetAppSettingPrograms();
			foreach(var program in programs) {
				if(File.Exists(program.AppConfigFilePath)) {
					File.Delete(program.AppConfigFilePath);
				}

				var programAppSettingItems = appSettingItemRepository.GetAppSettingItemsByProgramIDAndEnvironment(program.AppSettingProgramID, environment);
				var appSettingsKeyValuePairs = new Dictionary<string, string>();
				foreach(var programAppSettingItem in programAppSettingItems) {
					appSettingsKeyValuePairs.Add(programAppSettingItem.Key, programAppSettingItem.Value);
				}

				using(var fileStream = File.Create(program.AppConfigFilePath)) {
					using(var streamWriter = new StreamWriter(fileStream)) {
						streamWriter.WriteLine("<configuration><appSettings>");
						foreach(var appSettingItem in programAppSettingItems) {
							streamWriter.WriteLine($"<add key=\"{appSettingItem.Key}\" value=\"{appSettingItem.Value}\" />");
						}
						streamWriter.WriteLine("</appSettings></configuration>");
					}
				}
			}
		}
	}
}
