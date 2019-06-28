using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CallCheatOnline.Library.Data.Migrations
{
    public partial class AddConstraintsAndRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserLoginID",
                schema: "forum",
                table: "ForumUser",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserFriendship",
                schema: "auth",
                columns: table => new
                {
                    UserFromID = table.Column<int>(nullable: false),
                    UserToID = table.Column<int>(nullable: false),
                    WhenCreated = table.Column<DateTime>(nullable: true),
                    WhenDeleted = table.Column<DateTime>(nullable: true),
                    UserRoleID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFriendship", x => new { x.UserFromID, x.UserToID });
                    table.ForeignKey(
                        name: "FK_UserFriendship_UserLogin_UserFromID",
                        column: x => x.UserFromID,
                        principalSchema: "auth",
                        principalTable: "UserLogin",
                        principalColumn: "UserLoginID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserFriendship_UserRole_UserRoleID",
                        column: x => x.UserRoleID,
                        principalSchema: "auth",
                        principalTable: "UserRole",
                        principalColumn: "UserRoleID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserFriendship_UserLogin_UserToID",
                        column: x => x.UserToID,
                        principalSchema: "auth",
                        principalTable: "UserLogin",
                        principalColumn: "UserLoginID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLoginAndRole",
                schema: "auth",
                columns: table => new
                {
                    UserLoginID = table.Column<int>(nullable: false),
                    UserRoleID = table.Column<int>(nullable: false),
                    WhenCreated = table.Column<DateTime>(nullable: true),
                    WhenDeleted = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLoginAndRole", x => new { x.UserLoginID, x.UserRoleID });
                    table.ForeignKey(
                        name: "FK_UserLoginAndRole_UserLogin_UserLoginID",
                        column: x => x.UserLoginID,
                        principalSchema: "auth",
                        principalTable: "UserLogin",
                        principalColumn: "UserLoginID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLoginAndRole_UserRole_UserRoleID",
                        column: x => x.UserRoleID,
                        principalSchema: "auth",
                        principalTable: "UserRole",
                        principalColumn: "UserRoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ForumUser_UserLoginID",
                schema: "forum",
                table: "ForumUser",
                column: "UserLoginID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThread_ForumTopicID",
                schema: "forum",
                table: "ForumThread",
                column: "ForumTopicID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThread_ForumUserID",
                schema: "forum",
                table: "ForumThread",
                column: "ForumUserID",
                unique: true,
                filter: "[ForumUserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLike_ForumCommentID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumCommentID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLike_ForumThreadID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumThreadID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLike_ForumUserID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumUserID",
                unique: true,
                filter: "[ForumUserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComment_ForumThreadID",
                schema: "forum",
                table: "ForumComment",
                column: "ForumThreadID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComment_ForumUserID",
                schema: "forum",
                table: "ForumComment",
                column: "ForumUserID",
                unique: true,
                filter: "[ForumUserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_ForumUserID",
                schema: "auth",
                table: "UserLogin",
                column: "ForumUserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_GameUserID",
                schema: "auth",
                table: "UserLogin",
                column: "GameUserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppSettingItem_AppSettingProgramID",
                schema: "app",
                table: "AppSettingItem",
                column: "AppSettingProgramID");

            migrationBuilder.CreateIndex(
                name: "IX_UserFriendship_UserRoleID",
                schema: "auth",
                table: "UserFriendship",
                column: "UserRoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserFriendship_UserToID",
                schema: "auth",
                table: "UserFriendship",
                column: "UserToID");

            migrationBuilder.CreateIndex(
                name: "IX_UserLoginAndRole_UserRoleID",
                schema: "auth",
                table: "UserLoginAndRole",
                column: "UserRoleID");

            migrationBuilder.AddForeignKey(
                name: "FK_AppSettingItem_AppSettingProgram_AppSettingProgramID",
                schema: "app",
                table: "AppSettingItem",
                column: "AppSettingProgramID",
                principalSchema: "app",
                principalTable: "AppSettingProgram",
                principalColumn: "AppSettingProgramID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogin_ForumUser_ForumUserID",
                schema: "auth",
                table: "UserLogin",
                column: "ForumUserID",
                principalSchema: "forum",
                principalTable: "ForumUser",
                principalColumn: "ForumUserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogin_GameUser_GameUserID",
                schema: "auth",
                table: "UserLogin",
                column: "GameUserID",
                principalSchema: "game",
                principalTable: "GameUser",
                principalColumn: "GameUserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComment_ForumThread_ForumThreadID",
                schema: "forum",
                table: "ForumComment",
                column: "ForumThreadID",
                principalSchema: "forum",
                principalTable: "ForumThread",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComment_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumComment",
                column: "ForumUserID",
                principalSchema: "forum",
                principalTable: "ForumUser",
                principalColumn: "ForumUserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLike_ForumComment_ForumCommentID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumCommentID",
                principalSchema: "forum",
                principalTable: "ForumComment",
                principalColumn: "ForumCommentID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLike_ForumThread_ForumThreadID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumThreadID",
                principalSchema: "forum",
                principalTable: "ForumThread",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLike_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumLike",
                column: "ForumUserID",
                principalSchema: "forum",
                principalTable: "ForumUser",
                principalColumn: "ForumUserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumThread_ForumTopic_ForumTopicID",
                schema: "forum",
                table: "ForumThread",
                column: "ForumTopicID",
                principalSchema: "forum",
                principalTable: "ForumTopic",
                principalColumn: "ForumTopicID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumThread_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumThread",
                column: "ForumUserID",
                principalSchema: "forum",
                principalTable: "ForumUser",
                principalColumn: "ForumUserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumUser_UserLogin_UserLoginID",
                schema: "forum",
                table: "ForumUser",
                column: "UserLoginID",
                principalSchema: "auth",
                principalTable: "UserLogin",
                principalColumn: "UserLoginID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppSettingItem_AppSettingProgram_AppSettingProgramID",
                schema: "app",
                table: "AppSettingItem");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogin_ForumUser_ForumUserID",
                schema: "auth",
                table: "UserLogin");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogin_GameUser_GameUserID",
                schema: "auth",
                table: "UserLogin");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumComment_ForumThread_ForumThreadID",
                schema: "forum",
                table: "ForumComment");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumComment_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumComment");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumLike_ForumComment_ForumCommentID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumLike_ForumThread_ForumThreadID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumLike_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumThread_ForumTopic_ForumTopicID",
                schema: "forum",
                table: "ForumThread");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumThread_ForumUser_ForumUserID",
                schema: "forum",
                table: "ForumThread");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumUser_UserLogin_UserLoginID",
                schema: "forum",
                table: "ForumUser");

            migrationBuilder.DropTable(
                name: "UserFriendship",
                schema: "auth");

            migrationBuilder.DropTable(
                name: "UserLoginAndRole",
                schema: "auth");

            migrationBuilder.DropIndex(
                name: "IX_ForumUser_UserLoginID",
                schema: "forum",
                table: "ForumUser");

            migrationBuilder.DropIndex(
                name: "IX_ForumThread_ForumTopicID",
                schema: "forum",
                table: "ForumThread");

            migrationBuilder.DropIndex(
                name: "IX_ForumThread_ForumUserID",
                schema: "forum",
                table: "ForumThread");

            migrationBuilder.DropIndex(
                name: "IX_ForumLike_ForumCommentID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropIndex(
                name: "IX_ForumLike_ForumThreadID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropIndex(
                name: "IX_ForumLike_ForumUserID",
                schema: "forum",
                table: "ForumLike");

            migrationBuilder.DropIndex(
                name: "IX_ForumComment_ForumThreadID",
                schema: "forum",
                table: "ForumComment");

            migrationBuilder.DropIndex(
                name: "IX_ForumComment_ForumUserID",
                schema: "forum",
                table: "ForumComment");

            migrationBuilder.DropIndex(
                name: "IX_UserLogin_ForumUserID",
                schema: "auth",
                table: "UserLogin");

            migrationBuilder.DropIndex(
                name: "IX_UserLogin_GameUserID",
                schema: "auth",
                table: "UserLogin");

            migrationBuilder.DropIndex(
                name: "IX_AppSettingItem_AppSettingProgramID",
                schema: "app",
                table: "AppSettingItem");

            migrationBuilder.DropColumn(
                name: "UserLoginID",
                schema: "forum",
                table: "ForumUser");
        }
    }
}
