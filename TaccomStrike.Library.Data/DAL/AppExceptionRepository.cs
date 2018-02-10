using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.DAL {

    public class AppExceptionRepository {

        private readonly TaccomStrikeContext context;

        public AppExceptionRepository(TaccomStrikeContext context)
        {
            this.context = context;
        }

        public int CreateAppException(Exception e) {
            var appException = new AppException() {
                Message = e.Message,
                StackTrace = e.StackTrace,
                ExceptionString = e.ToString(),
                WhenCreated = DateTime.Now
            };

            context.AppException.Add(appException);
            context.SaveChanges();
            return appException.AppExceptionID;
        }
    }
}