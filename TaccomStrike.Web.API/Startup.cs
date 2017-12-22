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
using TaccomStrike.Library.Data.DAL;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Web.API.Hubs;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace TaccomStrike.Web.API
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
            services.AddCors(options => {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder
                    .WithOrigins(new string[] {"http://localhost:60239"})
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });

            services.AddMvc();
            services.AddSignalR();

            //Data layer service configurations
            services.AddDbContext<TaccomStrikeContext>((options) => 
            {
                options.UseSqlServer(ConfigurationManager.ConnectionStrings["Development"].ConnectionString);
            });
            services.AddScoped<ForumThreadRepository>();
            services.AddScoped<ForumCommentRepository>();
            services.AddScoped<ForumUserRepository>();
            services.AddScoped<UserLoginRepository>();

            //Service layer configurations
            services.AddScoped<UserAuthenticationService>();

            var sessionService = new SessionService();
            services.AddSingleton<SessionService>(sessionService);
            services.AddSingleton<UserConnectionService>();
            services.AddSingleton<ChatRoomService>();

            services.AddCustomCookieAuthentication(sessionService);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors("AllowSpecificOrigin");
            
            app.UseAuthentication();

            app.UseMvc();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("chat");
                routes.MapHub<GameHub>("game");
            });
        }
    }
}
