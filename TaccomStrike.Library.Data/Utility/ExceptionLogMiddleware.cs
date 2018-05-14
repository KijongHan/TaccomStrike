using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using TaccomStrike.Library.Data.DAL;

namespace TaccomStrike.Library.Data.Utilty {
 
    public class ExceptionLogMiddleware {
    
        private readonly RequestDelegate next;

        public ExceptionLogMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext, AppExceptionRepository appExceptionRepository)
        {
            try {
                await next(httpContext);
            }
            catch(Exception e) {
                appExceptionRepository.CreateAppException(e);
            }
        }
    }
}