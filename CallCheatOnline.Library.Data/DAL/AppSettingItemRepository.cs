using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CallCheatOnline.Library.Data.Model;

namespace CallCheatOnline.Library.Data.DAL {

	public class AppSettingItemRepository
	{
		private readonly CallCheatOnlineContext context;

		public AppSettingItemRepository(CallCheatOnlineContext context)
		{
			this.context = context;
		}

		public List<AppSettingItem> GetAppSettingItemsByProgramIDAndEnvironment(int programID, string environment)
		{
			var list = context.AppSettingItem
			.Where(item => item.AppSettingProgramID==programID && item.Environment ==environment)
			.ToList();

			return list;
		}
	}
}