using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.Model.FluentAPI
{
	public static class ForeignKeys
	{
		public static void BuildForeignKeys(this ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<ForumComment>()
				.HasOne(fc => fc.ForumThread)
				.WithMany(ft => ft.ForumComments)
				.HasForeignKey(fc => fc.ForumThreadID);
			modelBuilder
				.Entity<ForumComment>()
				.HasOne(fc => fc.ForumUser)
				.WithOne()
				.HasForeignKey<ForumComment>(fc => fc.ForumUserID);

			modelBuilder
				.Entity<ForumLike>()
				.HasOne(fl => fl.ForumComment)
				.WithMany(fc => fc.ForumLikes)
				.HasForeignKey(fl => fl.ForumCommentID);
			modelBuilder
				.Entity<ForumLike>()
				.HasOne(fl => fl.ForumThread)
				.WithMany(ft => ft.ForumLikes)
				.HasForeignKey(fl => fl.ForumThreadID);
			modelBuilder
				.Entity<ForumLike>()
				.HasOne(fl => fl.ForumUser)
				.WithOne()
				.HasForeignKey<ForumLike>(fl => fl.ForumUserID);

			modelBuilder
				.Entity<ForumThread>()
				.HasOne(ft => ft.ForumTopic)
				.WithMany(ft => ft.ForumThreads)
				.HasForeignKey(ft => ft.ForumTopicID);
			modelBuilder
				.Entity<ForumThread>()
				.HasOne(ft => ft.ForumUser)
				.WithOne()
				.HasForeignKey<ForumThread>(ft => ft.ForumUserID);

			modelBuilder
				.Entity<UserLogin>()
				.HasOne(ul => ul.ForumUser)
				.WithOne()
				.HasForeignKey<UserLogin>(ul => ul.ForumUserID);
			modelBuilder
				.Entity<UserLogin>()
				.HasOne(ul => ul.GameUser)
				.WithOne()
				.HasForeignKey<UserLogin>(ul => ul.GameUserID);
			modelBuilder
				.Entity<UserLoginAndRole>()
				.HasOne(ular => ular.UserLogin)
				.WithMany(ul => ul.UserLoginAndRoles)
				.HasForeignKey(ular => ular.UserLoginID);
			modelBuilder
				.Entity<UserLoginAndRole>()
				.HasOne(ular => ular.UserRole)
				.WithMany(ur => ur.UserLoginAndRoles)
				.HasForeignKey(ular => ular.UserRoleID);
			modelBuilder
				.Entity<UserFriendship>()
				.HasOne(ular => ular.FromUserLogin)
				.WithMany(ul => ul.UserFriendships)
				.HasForeignKey(ular => ular.UserFromID)
				.OnDelete(DeleteBehavior.Restrict);
			modelBuilder
				.Entity<UserFriendship>()
				.HasOne(ular => ular.ToUserLogin)
				.WithMany(ul => ul.UserFriendshipsOf)
				.HasForeignKey(ular => ular.UserToID);

			modelBuilder
				.Entity<AppSettingItem>()
				.HasOne(asi => asi.AppSettingProgram)
				.WithMany(asp => asp.AppSettingItems)
				.HasForeignKey(asi => asi.AppSettingProgramID);
		}
	}
}
