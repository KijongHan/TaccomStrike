using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace TaccomStrike.Library.Utility.Security
{
	public static class Authentication
	{
		public static Task<string> GenerateSaltAsync() 
		{
			return Task.Run(() => 
			{
				RNGCryptoServiceProvider rngCrypto = new RNGCryptoServiceProvider();
				byte[] salt = new byte[32];
				rngCrypto.GetBytes(salt);
				return Convert.ToBase64String(salt);
			});
		}

		public static Task<string> HashPasswordAsync(string value, string salt)
		{
			return Task.Run(() => 
			{
				byte[] bSalt = Convert.FromBase64String(salt);
				byte[] hashedPassword = new Rfc2898DeriveBytes(value, bSalt).GetBytes(16);
				return Convert.ToBase64String(hashedPassword);
			});
		}

		public static Task<bool> AuthenticateLoginCredentialsAsync(string salt, string password, string storedPassword)
		{
			return Task.Run(() => 
			{
				string hashedPassword = HashPassword(password, salt);

				if (hashedPassword == storedPassword)
				{
					return true;
				}
				return false;
			});
		}

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
