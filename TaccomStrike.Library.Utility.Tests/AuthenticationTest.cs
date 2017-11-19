using Microsoft.VisualStudio.TestTools.UnitTesting;
using TaccomStrike.Library.Utility.Security;

namespace TaccomStrike.Library.Utility.Tests
{
    [TestClass]
    public class AuthenticationTest
    {
        [TestMethod]
        public void Test()
        {
            string password = "hello world";
            string salt1 = Authentication.GenerateSalt();
            string salt2 = Authentication.GenerateSalt();

            string hashPassword1 = Authentication.HashPassword(password, salt1);
            string hashPassword2 = Authentication.HashPassword(password, salt2);

            Assert.AreNotEqual(hashPassword1, hashPassword2);

            Assert.AreEqual(true, Authentication.AuthenticateLoginCredentials(salt1, password, hashPassword1));
            Assert.AreEqual(true, Authentication.AuthenticateLoginCredentials(salt2, password, hashPassword2));
        }
    }
}
