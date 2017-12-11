using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Data.DAL;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Data.Services
{
    public class SessionService : ITicketStore {

        private readonly Dictionary<string, AuthenticationTicket> userSessions;

        public SessionService() {
            userSessions = new Dictionary<string, AuthenticationTicket>();
        }

        public Task RemoveAsync(string key)
        {
            return Task.Run(() => 
            {
                userSessions.Remove(key);
            });
        }

        public Task RenewAsync(string key, AuthenticationTicket ticket)
        {
            return Task.Run(() => 
            {
                if(userSessions.ContainsKey(key)) {
                    userSessions[key] = ticket;
                }
            });        
        }

        public Task<AuthenticationTicket> RetrieveAsync(string key)
        {
            return Task.Run(() => 
            {
                if(userSessions.ContainsKey(key)) {
                    return userSessions[key];
                }
                return null;
            });
        }

        public Task<string> StoreAsync(AuthenticationTicket ticket)
        {
            return Task.Run(() => 
            {
                var salt = Authentication.GenerateSalt();
                userSessions.Add(salt, ticket);
                return salt;
            });
        }
    }   
}
