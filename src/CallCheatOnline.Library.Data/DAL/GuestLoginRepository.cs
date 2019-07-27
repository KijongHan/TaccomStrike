using System.Collections.Generic;
using System.Linq;
using CallCheatOnline.Library.Data.ViewModel;
using CallCheatOnline.Library.Data.ApiEntities;

namespace CallCheatOnline.Library.Data.DAL 
{
    public class GuestLoginRepository 
    {
        private int currentGuestLoginID;
        private object repositoryLock;
        private List<GuestLogin> guestLogins;

        public GuestLoginRepository() 
        {
            currentGuestLoginID = -1;
            repositoryLock = new object();
            guestLogins = new List<GuestLogin>();
        }

        public List<GuestLogin> GetGuestLogins(string guestName) 
        {
            lock(repositoryLock) 
            {
                return guestLogins
                    .Where(x => x.GuestName == guestName)
                    .ToList();
            }
        }

        public int CreateGuestLogin(PostGuestLogin guestLogin) 
        {
            lock(repositoryLock) 
            {
                currentGuestLoginID += 1;
                guestLogins.Add(new GuestLogin {
                    GuestLoginID = currentGuestLoginID,
                    GuestName = guestLogin.Guestname
                });
                return currentGuestLoginID;
            }
        }

        public void RemoveGuestLogin(int guestLoginID) 
        {
            lock(repositoryLock) 
            {
                guestLogins.RemoveAll(x => x.GuestLoginID == guestLoginID);
            }
        }
    }
}