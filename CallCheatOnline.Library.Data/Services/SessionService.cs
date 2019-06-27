using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Data.DAL;
using CallCheatOnline.Library.Data.Services;
using CallCheatOnline.Library.Utility.Security;

namespace CallCheatOnline.Library.Data.Services
{
	public class SessionService : ITicketStore {

		private readonly Dictionary<string, AuthenticationTicket> userSessions;

		public SessionService() {
			userSessions = new Dictionary<string, AuthenticationTicket>();
		}

		public Task RemoveAsync(string key)
		{
			lock(userSessions) {
				return Task.Run(() => 
				{
					userSessions.Remove(key);
				});
			}
		}

		public Task RenewAsync(string key, AuthenticationTicket ticket)
		{
			lock(userSessions) {
				return Task.Run(() => 
				{
					if(userSessions.ContainsKey(key)) {
						userSessions[key] = ticket;
					}
				});  
			}    
		}

		public Task<AuthenticationTicket> RetrieveAsync(string key)
		{
			lock(userSessions) {
				return Task.Run(() => 
				{
					if(userSessions.ContainsKey(key)) {
						return userSessions[key];
					}
					return null;
				});
			}
			
		}

		public Task<string> StoreAsync(AuthenticationTicket ticket)
		{
			lock(userSessions) {
				return Task.Run(() => 
				{
					var salt = Authentication.GenerateSalt();
					userSessions.Add(salt, ticket);
					return salt;
				});
			}
		}
	}   
}
