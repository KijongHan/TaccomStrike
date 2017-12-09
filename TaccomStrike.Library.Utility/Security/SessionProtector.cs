using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Authentication;
using System;
using System.Text;

namespace TaccomStrike.Library.Utility.Security
{
    public class SessionProtector {

        private IDataProtector dataProtectionProvider;

        public SessionProtector() {
            dataProtectionProvider = DataProtectionProvider
                    .Create("test")
                    .CreateProtector("test");
        }

        public ISecureDataFormat<AuthenticationTicket> GetTicketDataFormat() {
            return new TicketDataFormat(DataProtectionProvider
                    .Create("test")
                    .CreateProtector("test"));   
        }

        public string Unprotect(string protectedData) {
            var protectedDataBytes = Convert.FromBase64String(protectedData);
            var unprotectedData = dataProtectionProvider.Unprotect(protectedDataBytes);
            return Convert.ToBase64String(unprotectedData);
        }

        public string Protect(string unprotectedData) {
            var unprotectedDataBytes = Convert.FromBase64String(unprotectedData);
            var protectedData = dataProtectionProvider.Protect(unprotectedDataBytes);
            return Convert.ToBase64String(protectedData);
        }
    }
}
