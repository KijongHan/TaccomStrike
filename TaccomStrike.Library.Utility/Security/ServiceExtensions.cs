using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;

namespace TaccomStrike.Library.Utility.Security
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddTaccomStrikeAuthentication(this IServiceCollection service, ITicketStore sessionStore)
        {
            service
                .AddAuthentication(Security.AuthenticationScheme)
                .AddCookie(Security.AuthenticationScheme, options => 
                {
                    options.Cookie.Name = Security.CookieName;
                    options.SessionStore = sessionStore;
                });
            return service;
        }

        public static IServiceCollection AddTaccomStrikeAuthorization(this IServiceCollection service) 
        {
            service.AddAuthorization(options => 
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireClaim("IsAdmin"));
            });
            return service;
        }
    }
}
