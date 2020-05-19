using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CallCheatOnline.Library.Data.Model;

namespace CallCheatOnline.Library.Data.DAL
{
	public class AppExceptionRepository
	{
		private readonly CallCheatOnlineContext context;

		public AppExceptionRepository(CallCheatOnlineContext context)
		{
			this.context = context;
		}

		public int CreateAppException(Exception e)
		{
			var appException = new AppException
			{
				Message = e.Message,
				StackTrace = e.StackTrace,
				ExceptionString = e.ToString(),
				WhenCreated = DateTime.UtcNow
			};

			context.AppException.Add(appException);
			context.SaveChanges();
			return appException.AppExceptionID;
		}
	}
}