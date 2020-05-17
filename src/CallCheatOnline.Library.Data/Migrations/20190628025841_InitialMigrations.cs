using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CallCheatOnline.Library.Data.Migrations
{
	public partial class InitialMigrations : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.EnsureSchema(
				name: "app");

			migrationBuilder.EnsureSchema(
				name: "forum");

			migrationBuilder.EnsureSchema(
				name: "game");

			migrationBuilder.EnsureSchema(
				name: "auth");

			migrationBuilder.CreateTable(
				name: "AppException",
				schema: "app",
				columns: table => new
				{
					AppExceptionID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Message = table.Column<string>(nullable: true),
					StackTrace = table.Column<string>(nullable: true),
					ExceptionString = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_AppException", x => x.AppExceptionID);
				});

			migrationBuilder.CreateTable(
				name: "AppSettingItem",
				schema: "app",
				columns: table => new
				{
					AppSettingItemID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					AppSettingProgramID = table.Column<int>(nullable: false),
					Environment = table.Column<string>(nullable: true),
					Key = table.Column<string>(nullable: true),
					Value = table.Column<string>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_AppSettingItem", x => x.AppSettingItemID);
				});

			migrationBuilder.CreateTable(
				name: "AppSettingProgram",
				schema: "app",
				columns: table => new
				{
					AppSettingProgramID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					ProgramName = table.Column<string>(nullable: true),
					AppConfigFilePath = table.Column<string>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_AppSettingProgram", x => x.AppSettingProgramID);
				});

			migrationBuilder.CreateTable(
				name: "UserLogin",
				schema: "auth",
				columns: table => new
				{
					UserLoginID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Username = table.Column<string>(nullable: true),
					Email = table.Column<string>(nullable: true),
					PasswordHash = table.Column<string>(nullable: true),
					PasswordSalt = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true),
					ForumUserID = table.Column<int>(nullable: false),
					GameUserID = table.Column<int>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserLogin", x => x.UserLoginID);
				});

			migrationBuilder.CreateTable(
				name: "UserRole",
				schema: "auth",
				columns: table => new
				{
					UserRoleID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					RoleName = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserRole", x => x.UserRoleID);
				});

			migrationBuilder.CreateTable(
				name: "ForumComment",
				schema: "forum",
				columns: table => new
				{
					ForumCommentID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					CommentContent = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: false),
					WhenDeleted = table.Column<DateTime>(nullable: true),
					ForumThreadID = table.Column<int>(nullable: true),
					ForumUserID = table.Column<int>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ForumComment", x => x.ForumCommentID);
				});

			migrationBuilder.CreateTable(
				name: "ForumLike",
				schema: "forum",
				columns: table => new
				{
					ForumLikeID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					LikeWeight = table.Column<int>(nullable: false),
					ForumCommentID = table.Column<int>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true),
					ForumThreadID = table.Column<int>(nullable: true),
					ForumUserID = table.Column<int>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ForumLike", x => x.ForumLikeID);
				});

			migrationBuilder.CreateTable(
				name: "ForumThread",
				schema: "forum",
				columns: table => new
				{
					ForumThreadID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Title = table.Column<string>(nullable: true),
					Content = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true),
					ForumUserID = table.Column<int>(nullable: true),
					ForumTopicID = table.Column<int>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ForumThread", x => x.ForumThreadID);
				});

			migrationBuilder.CreateTable(
				name: "ForumTopic",
				schema: "forum",
				columns: table => new
				{
					ForumTopicID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Title = table.Column<string>(nullable: true),
					Description = table.Column<string>(nullable: true),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ForumTopic", x => x.ForumTopicID);
				});

			migrationBuilder.CreateTable(
				name: "ForumUser",
				schema: "forum",
				columns: table => new
				{
					ForumUserID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ForumUser", x => x.ForumUserID);
				});

			migrationBuilder.CreateTable(
				name: "GameUser",
				schema: "game",
				columns: table => new
				{
					GameUserID = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					GameScore = table.Column<int>(nullable: false),
					WhenCreated = table.Column<DateTime>(nullable: true),
					WhenDeleted = table.Column<DateTime>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_GameUser", x => x.GameUserID);
				});
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "AppException",
				schema: "app");

			migrationBuilder.DropTable(
				name: "AppSettingItem",
				schema: "app");

			migrationBuilder.DropTable(
				name: "AppSettingProgram",
				schema: "app");

			migrationBuilder.DropTable(
				name: "UserLogin",
				schema: "auth");

			migrationBuilder.DropTable(
				name: "UserRole",
				schema: "auth");

			migrationBuilder.DropTable(
				name: "ForumComment",
				schema: "forum");

			migrationBuilder.DropTable(
				name: "ForumLike",
				schema: "forum");

			migrationBuilder.DropTable(
				name: "ForumThread",
				schema: "forum");

			migrationBuilder.DropTable(
				name: "ForumTopic",
				schema: "forum");

			migrationBuilder.DropTable(
				name: "ForumUser",
				schema: "forum");

			migrationBuilder.DropTable(
				name: "GameUser",
				schema: "game");
		}
	}
}
