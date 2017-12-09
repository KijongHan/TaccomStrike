using System;
using TaccomStrike.Library.Utility.Security;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            SessionProtector p = new SessionProtector();
            string output = p.Protect("Plat");
            Console.WriteLine(output);
            string o2 = p.Unprotect(output);
            Console.WriteLine(o2);
        }
    }
}
