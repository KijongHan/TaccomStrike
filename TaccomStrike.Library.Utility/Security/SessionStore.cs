using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace TaccomStrike.Web.API.Authentication
{
    public class SessionStore : ITicketStore
    {

        private readonly Dictionary<string, AuthenticationTicket> users;

        public SessionStore()
        {
            users = new Dictionary<string, AuthenticationTicket>();
        }

        public Task RemoveAsync(string key)
        {
            throw new NotImplementedException();
        }

        public Task RenewAsync(string key, AuthenticationTicket ticket)
        {
            throw new NotImplementedException();
        }

        public Task<AuthenticationTicket> RetrieveAsync(string key)
        {
            return Task.Run(() => 
            {
                return users[key];
            });
        }

        public Task<string> StoreAsync(AuthenticationTicket ticket)
        {
            return Task.Run(() => 
            {
                users.Add("one", ticket);
                return "one";
            });
        }
    }
}
