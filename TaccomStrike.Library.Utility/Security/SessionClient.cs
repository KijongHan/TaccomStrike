using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Utility.Web;

namespace TaccomStrike.Web.API.Authentication
{
    public class SessionClient : ITicketStore
    {

        private HttpClient httpClient;

        public SessionClient()
        {
            httpClient = new HttpClient();
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
                AuthenticationTicket ticket = null;
                HttpResponseMessage response = httpClient.GetAsync("").Result;
                if(response.IsSuccessStatusCode) {
                    ticket = response.Content.ReadAsJsonAsync<AuthenticationTicket>().Result;         
                }
                return ticket;
            });
        }

        public Task<string> StoreAsync(AuthenticationTicket ticket)
        {
            return Task.Run(() => 
            {
                string sessionID = "";
                StringContent content = new StringContent(ticket.ToString(), Encoding.UTF8, "application/json");;
                HttpResponseMessage response = httpClient.PostAsync("", content).Result;
                if(response.IsSuccessStatusCode) {
                    sessionID = response.Content.ReadAsStringAsync().Result;
                }
                return sessionID;
            });
        }
    }
}
