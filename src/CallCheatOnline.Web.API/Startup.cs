using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CallCheatOnline.Library.Data.DAL;
using CallCheatOnline.Library.Data.Model;
using CallCheatOnline.Library.Data.Utilty;
using CallCheatOnline.Library.Utility.Security;
using CallCheatOnline.Library.Data.Services;
using CallCheatOnline.Web.API.Hubs;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace CallCheatOnline.Web.API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options => 
			{
				options.AddPolicy(Security.CrossOriginRequestPolicy,
					builder => builder
					.WithOrigins(new string[] {ConfigurationManager.AppSettings["WebUIIPAddress"]})
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials());
			});

			services.AddMvc();
			services.AddSignalR();

			//Data layer service configurations
			services.AddDbContext<CallCheatOnlineContext>((options) => 
			{
				options.UseSqlServer(
					ConfigurationManager.AppSettings["ConnectionString"], 
					sqlServerOptions => sqlServerOptions.MigrationsAssembly(typeof(CallCheatOnlineContext).Assembly.FullName));
			});
			services.AddScoped<GameUserRepository>();
			services.AddScoped<ForumThreadRepository>();
			services.AddScoped<ForumCommentRepository>();
			services.AddScoped<ForumUserRepository>();
			services.AddScoped<UserLoginRepository>();
			services.AddScoped<AppExceptionRepository>();
			services.AddSingleton<GuestLoginRepository>();

			//Service layer configurations
			services.AddScoped<UserAuthenticationService>();
			
			services.AddSingleton<UserConnectionsService>();
			services.AddSingleton<ChatRoomService>();
			services.AddSingleton<GameLobbyService>();

			services.AddCustomCookieAuthentication(ConfigurationManager.AppSettings["CookieDomain"]);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMiddleware<ExceptionLogMiddleware>();

			app.UseCors(Security.CrossOriginRequestPolicy);
			
			app.UseAuthentication();

			app.UseMvc();
			app.UseSignalR(routes =>
			{
				routes.MapHub<ChatHub>("/chat");
				routes.MapHub<GameHub>("/game");
			});
		}
	}
}
