using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;

namespace CallCheatOnline.Library.Utility.Security
{
	public static class ServiceExtensions
	{
		public static IServiceCollection AddCustomCookieAuthentication(this IServiceCollection service, string cookieDomain)
		{
			service
				.AddAuthentication(Security.AuthenticationScheme)
				.AddCookie(Security.AuthenticationScheme, options => 
				{
					options.Cookie.Name = Security.CookieName;
					options.Cookie.Domain = cookieDomain;
					options.Cookie.Expiration = TimeSpan.FromHours(2);
				});
			return service;
		}

		public static IServiceCollection AddCallCheatOnlineAuthorization(this IServiceCollection service) 
		{
			service.AddAuthorization(options => 
			{
				options.AddPolicy("AdminOnly", policy => policy.RequireClaim("IsAdmin"));
			});
			return service;
		}
	}
}
