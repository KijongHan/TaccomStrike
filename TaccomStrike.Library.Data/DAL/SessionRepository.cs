using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.DAL 
{
    public class SessionRepository {

        private TaccomStrikeContext dbContext;

        public SessionRepository(TaccomStrikeContext dbContext) {
            this.dbContext = dbContext;
        }

        public Session GetSession(string unprotectedSessionID) {
            var session = dbContext.Session
            .Where((item) => item.UnprotectedSessionID==unprotectedSessionID)
            .FirstOrDefault();
            return session;
        }

        public Task<int> StoreSession(Session session) {
            return Task.Run(() => 
            {
                dbContext.Session.Add(session);
                dbContext.SaveChanges();
                return session.SessionID;
            });
        }

    }
}
