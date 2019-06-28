using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.Model.FluentAPI
{
	public static class TableMappings
	{
		public static void BuildTableMappings(this ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<ForumComment>()
				.ToTable("ForumComment", schema: "forum");
			modelBuilder
				.Entity<ForumLike>()
				.ToTable("ForumLike", schema: "forum");
			modelBuilder
				.Entity<ForumThread>()
				.ToTable("ForumThread", schema: "forum");
			modelBuilder
				.Entity<ForumTopic>()
				.ToTable("ForumTopic", schema: "forum");
			modelBuilder
				.Entity<ForumUser>()
				.ToTable("ForumUser", schema: "forum");

			modelBuilder
				.Entity<UserRole>()
				.ToTable("UserRole", schema: "auth");
			modelBuilder
				.Entity<UserLogin>()
				.ToTable("UserLogin", schema: "auth");
			modelBuilder
				.Entity<UserLoginAndRole>()
				.ToTable("UserLoginAndRole", schema: "auth");
			modelBuilder
				.Entity<UserFriendship>()
				.ToTable("UserFriendship", schema: "auth");

			modelBuilder
				.Entity<GameUser>()
				.ToTable("GameUser", schema: "game");

			modelBuilder
				.Entity<AppException>()
				.ToTable("AppException", schema: "app");
			modelBuilder
				.Entity<AppSettingProgram>()
				.ToTable("AppSettingProgram", schema: "app");
			modelBuilder
				.Entity<AppSettingItem>()
				.ToTable("AppSettingItem", schema: "app");
		}
	}
}
