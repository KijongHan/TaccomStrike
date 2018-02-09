using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TaccomStrike.Library.Data.Model
{
    public partial class TaccomStrikeContext : DbContext
    {
        public virtual DbSet<ForumComment> ForumComment { get; set; }
        public virtual DbSet<ForumLike> ForumLike { get; set; }
        public virtual DbSet<ForumThread> ForumThread { get; set; }
        public virtual DbSet<ForumTopic> ForumTopic { get; set; }
        public virtual DbSet<ForumUser> ForumUser { get; set; }

        public virtual DbSet<UserLogin> UserLogin {get;set;}
        public virtual DbSet<UserRole> UserRole {get;set;}

        public virtual DbSet<AppSettingProgram> AppSettingProgram {get;set;}
        public virtual DbSet<AppSettingItem> AppSettingItem {get;set;}
        
        public TaccomStrikeContext(DbContextOptions<TaccomStrikeContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
