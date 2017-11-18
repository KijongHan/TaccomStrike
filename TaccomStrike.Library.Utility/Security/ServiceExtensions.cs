using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Library.Utility.Security
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddTaccomStrikeAuthentication(this IServiceCollection service, ITicketStore sessionStore)
        {
            service
                .AddAuthentication(TaccomStrikeSecurity.AuthenticationScheme)
                .AddCookie(TaccomStrikeSecurity.AuthenticationScheme, options => 
                {
                    options.Cookie.Name = TaccomStrikeSecurity.CookieName;
                    options.SessionStore = sessionStore;
                });
            return service;
        }
    }
}
