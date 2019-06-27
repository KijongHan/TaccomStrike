using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CallCheatOnline.Library.Data.Model.Views;

namespace CallCheatOnline.Library.Data.Model
{
	public partial class CallCheatOnlineContext : DbContext
	{
		public virtual DbSet<GameUser> GameUser { get; set; }

		public virtual DbSet<ForumComment> ForumComment { get; set; }
		public virtual DbSet<ForumLike> ForumLike { get; set; }
		public virtual DbSet<ForumThread> ForumThread { get; set; }
		public virtual DbSet<ForumTopic> ForumTopic { get; set; }
		public virtual DbSet<ForumUser> ForumUser { get; set; }

		public virtual DbSet<UserLogin> UserLogin {get;set;}
		public virtual DbSet<UserRole> UserRole {get;set;}
		public virtual DbQuery<UserComplete> UserComplete { get; set; }

		public virtual DbSet<AppException> AppException {get;set;}
		public virtual DbSet<AppSettingProgram> AppSettingProgram {get;set;}
		public virtual DbSet<AppSettingItem> AppSettingItem {get;set;}
		
		public CallCheatOnlineContext() : base(
			new DbContextOptionsBuilder<CallCheatOnlineContext>()
				.UseSqlServer(ConfigurationManager.AppSettings["ConnectionString"])
				.Options
			)
		{}

		public CallCheatOnlineContext(DbContextOptions<CallCheatOnlineContext> options)
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
