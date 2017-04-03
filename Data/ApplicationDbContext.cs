using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AvaNet.Models;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AvaNet.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationUsersFriendship> ApplicationUsersFriendships { get; set; }

        public DbSet<ForumLike> ForumLikes { get; set; }
        public DbSet<ForumComment> ForumComments { get; set; }
        public DbSet<ForumThread> ForumThreads { get; set; }
        public DbSet<ForumTopic> ForumTopics { get; set; }
        
        public DbSet<GameUser> GameUsers { get; set; }
        public DbSet<GameLore> GameLores { get; set; }
             
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<ForumLike>()
                .Ignore(t => t.ApplicationUser);
            builder.Entity<ForumThread>()
                .Ignore(c => c.ApplicationUser);
            builder.Entity<ForumThread>()
                .Ignore(c => c.ForumTopic);
            builder.Entity<ForumComment>()
                .Ignore(c => c.ForumThread);

            builder.Entity<ForumLike>()
                .HasOne(c => c.ApplicationUser)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<ForumThread>()
                .HasOne(c => c.ApplicationUser)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>()
                .HasMany(c => c.ForumThreads)
                .WithOne();

            builder.Entity<ForumThread>()
                .HasOne(c => c.ForumTopic)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ForumComment>()
                .HasOne(c => c.ForumThread)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
