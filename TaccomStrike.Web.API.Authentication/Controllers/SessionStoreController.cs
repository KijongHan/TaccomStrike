using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaccomStrike.Library.Data.Services;
using Microsoft.AspNetCore.Authentication;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.ViewModel;

[Route("sessionstore")]
public class SessionStoreController {

    private SessionStore sessionStore;
    private SessionProtector sessionProtector;

    public SessionStoreController(SessionStore sessionStore, SessionProtector sessionProtector)
    {
        this.sessionStore = sessionStore;
        this.sessionProtector = sessionProtector;
    }

    [Route("")]
    [HttpGet]
    public async Task<AuthenticationTicket> GetTicketAsync(string sessionID) {
        var ticket = await sessionStore.GetAuthenticationTicket(sessionID, sessionProtector);
        return ticket;
    }

    [Route("")]
    [HttpPost]
    public async Task<string> PostTicketAsync(AuthenticationTicket ticket) {
        var sessionID = await sessionStore.StoreAsync(ticket);
        return sessionID;
    }

}