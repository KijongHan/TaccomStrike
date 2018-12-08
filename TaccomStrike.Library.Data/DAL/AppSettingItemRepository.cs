using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.DAL {

	public class AppSettingItemRepository
	{
		private readonly TaccomStrikeContext context;

		public AppSettingItemRepository(TaccomStrikeContext context)
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