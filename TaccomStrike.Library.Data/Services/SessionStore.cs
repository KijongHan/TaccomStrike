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
    public class SessionStore : ITicketStore {

        private readonly UserAuthenticationService userAuthenticationService;
        private readonly SessionRepository sessionRepository;

        public SessionService(SessionRepository sessionRepository, UserAuthenticationService userAuthenticationService) {
            this.sessionRepository = sessionRepository;
            this.userAuthenticationService = userAuthenticationService;
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
                var session = sessionRepository.GetSession(key);
                var claimsPrincipal = userAuthenticationService.GetClaimsPrincipalAsync(session.UserLoginID).Result;
                return new AuthenticationTicket(claimsPrincipal, Security.AuthenticationScheme);
            });
        }

        public Task<string> StoreAsync(AuthenticationTicket ticket)
        {
            return Task.Run(() => 
            {
                var userID = ticket.Principal.GetUserID();
                var salt = Authentication.GenerateSalt();
                sessionRepository.StoreSession(new Session {UnprotectedSessionID=salt, UserLoginID=userID});
                return salt;
            });
        }
    }   
}
