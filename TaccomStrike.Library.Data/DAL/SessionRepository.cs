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

        private CacheDbContext dbContext;

        public SessionRepository(CacheDbContext dbContext) {
            this.dbContext = dbContext;
        }

        public Session GetSession(string unprotectedSessionID) {
            var session = dbContext.Session
            .Where((item) => item.UnprotectedSessionID==unprotectedSessionID)
            .FirstOrDefault();
            return session;
        }

        public int StoreSession(Session session) {
            session.WhenCreated = DateTime.Now;
            dbContext.Session.Add(session);
            dbContext.SaveChanges();
            Console.WriteLine(session.SessionID);
            return session.SessionID;
        }

    }
}
