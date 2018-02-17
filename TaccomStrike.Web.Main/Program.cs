using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Configuration;
using System.Net;

namespace TaccomStrike
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .UseKestrel(options => {
                    string ipAddress = ConfigurationManager.AppSettings["WebUIIPAddress"];
                    int networkPort = Convert.ToInt32(ConfigurationManager.AppSettings["WebUINetworkPort"]);
                    bool useHttps = Convert.ToBoolean(ConfigurationManager.AppSettings["UseHttps"]);

                    string certificateFilename = ConfigurationManager.AppSettings["CertificateFilename"];
                    string certificatePassword = ConfigurationManager.AppSettings["CertificateFilename"];
                
                    if(useHttps) {
                        options.Listen(
                            IPAddress.Parse(ipAddress), 
                            networkPort,
                            listenOptions => {
                                listenOptions.UseHttps(certificateFilename, certificatePassword);
                            }
                        );
                    } else {
                        options.Listen(
                            IPAddress.Parse(ipAddress), 
                            networkPort
                        );
                    }
                })
                .Build();
    }
}
