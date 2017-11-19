using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TaccomStrike.Library.Utility.Security
{
    public static class Authentication
    {
        public static string GenerateSalt()
        {
            RNGCryptoServiceProvider rngCrypto = new RNGCryptoServiceProvider();
            byte[] salt = new byte[32];
            rngCrypto.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }

        public static string HashPassword(string value, string salt)
        {
            byte[] bSalt = Convert.FromBase64String(salt);
            byte[] hashedPassword = new Rfc2898DeriveBytes(value, bSalt).GetBytes(16);
            return Convert.ToBase64String(hashedPassword);
        }

        public static bool AuthenticateLoginCredentials(string salt, string password, string storedPassword)
        {
            string hashedPassword = HashPassword(password, salt);

            if (hashedPassword == storedPassword)
            {
                return true;
            }
            return false;
        }
    }
}
