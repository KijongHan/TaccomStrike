using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CallCheatOnline.Library.Data.Model.FluentAPI
{
	public static class PrimaryKeys
	{
		public static void BuildPrimaryKeys(this ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<ForumComment>()
				.HasKey(q => q.ForumCommentID);
			modelBuilder
				.Entity<ForumThread>()
				.HasKey(q => q.ForumThreadID);
			modelBuilder
				.Entity<ForumLike>()
				.HasKey(q => q.ForumLikeID);
			modelBuilder
				.Entity<ForumTopic>()
				.HasKey(q => q.ForumTopicID);
			modelBuilder
				.Entity<ForumUser>()
				.HasKey(q => q.ForumUserID);

			modelBuilder
				.Entity<UserLogin>()
				.HasKey(q => q.UserLoginID);
			modelBuilder
				.Entity<UserRole>()
				.HasKey(q => q.UserRoleID);
			modelBuilder
				.Entity<UserLoginAndRole>()
				.HasKey(q => new { q.UserLoginID, q.UserRoleID });
			modelBuilder
				.Entity<UserFriendship>()
				.HasKey(q => new { q.UserFromID, q.UserToID });

			modelBuilder
				.Entity<GameUser>()
				.HasKey(q => q.GameUserID);

			modelBuilder
				.Entity<AppException>()
				.HasKey(q => q.AppExceptionID);
			modelBuilder
				.Entity<AppSettingItem>()
				.HasKey(q => q.AppSettingItemID);
			modelBuilder
				.Entity<AppSettingProgram>()
				.HasKey(q => q.AppSettingProgramID);
		}
	}
}
