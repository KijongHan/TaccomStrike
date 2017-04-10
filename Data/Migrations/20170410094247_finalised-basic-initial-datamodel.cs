using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AvaNet.Data.Migrations
{
    public partial class finalisedbasicinitialdatamodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUsersFriendships",
                columns: table => new
                {
                    ApplicationUsersFriendshipID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserFriendId = table.Column<string>(nullable: true),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUsersFriendships", x => x.ApplicationUsersFriendshipID);
                    table.ForeignKey(
                        name: "FK_ApplicationUsersFriendships_AspNetUsers_ApplicationUserFriendId",
                        column: x => x.ApplicationUserFriendId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUsersFriendships_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForumTopics",
                columns: table => new
                {
                    ForumTopicID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumTopics", x => x.ForumTopicID);
                });

            migrationBuilder.CreateTable(
                name: "GameLores",
                columns: table => new
                {
                    GameLoreID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    ImageURL = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameLores", x => x.GameLoreID);
                });

            migrationBuilder.CreateTable(
                name: "GameUsers",
                columns: table => new
                {
                    GameUserID = table.Column<string>(maxLength: 25, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameUsers", x => x.GameUserID);
                });

            migrationBuilder.CreateTable(
                name: "PinnedForumThreads",
                columns: table => new
                {
                    PinnedForumThreadsID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PinnedForumThreads", x => x.PinnedForumThreadsID);
                });

            migrationBuilder.CreateTable(
                name: "ForumThreads",
                columns: table => new
                {
                    ForumThreadID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ApplicationUserId1 = table.Column<string>(nullable: true),
                    Content = table.Column<string>(maxLength: 1500, nullable: false),
                    ForumThreadCreationTime = table.Column<DateTime>(nullable: false),
                    ForumTopicID = table.Column<int>(nullable: false),
                    ForumTopicID1 = table.Column<int>(nullable: true),
                    IsBanned = table.Column<bool>(nullable: false),
                    PinnedForumThreadsID = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumThreads", x => x.ForumThreadID);
                    table.ForeignKey(
                        name: "FK_ForumThreads_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumThreads_AspNetUsers_ApplicationUserId1",
                        column: x => x.ApplicationUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumThreads_ForumTopics_ForumTopicID",
                        column: x => x.ForumTopicID,
                        principalTable: "ForumTopics",
                        principalColumn: "ForumTopicID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ForumThreads_ForumTopics_ForumTopicID1",
                        column: x => x.ForumTopicID1,
                        principalTable: "ForumTopics",
                        principalColumn: "ForumTopicID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumThreads_PinnedForumThreads_PinnedForumThreadsID",
                        column: x => x.PinnedForumThreadsID,
                        principalTable: "PinnedForumThreads",
                        principalColumn: "PinnedForumThreadsID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForumComments",
                columns: table => new
                {
                    ForumCommentID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    Content = table.Column<string>(maxLength: 1500, nullable: false),
                    ForumCommentCreationTime = table.Column<DateTime>(nullable: false),
                    ForumThreadID = table.Column<int>(nullable: true),
                    IsBanned = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumComments", x => x.ForumCommentID);
                    table.ForeignKey(
                        name: "FK_ForumComments_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumComments_ForumThreads_ForumThreadID",
                        column: x => x.ForumThreadID,
                        principalTable: "ForumThreads",
                        principalColumn: "ForumThreadID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForumLikes",
                columns: table => new
                {
                    ForumLikeID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ForumCommentID = table.Column<int>(nullable: true),
                    ForumThreadID = table.Column<int>(nullable: true),
                    Weight = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumLikes", x => x.ForumLikeID);
                    table.ForeignKey(
                        name: "FK_ForumLikes_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumLikes_ForumComments_ForumCommentID",
                        column: x => x.ForumCommentID,
                        principalTable: "ForumComments",
                        principalColumn: "ForumCommentID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                        column: x => x.ForumThreadID,
                        principalTable: "ForumThreads",
                        principalColumn: "ForumThreadID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<string>(
                name: "AvatarImageURL",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GameUserID",
                table: "AspNetUsers",
                maxLength: 25,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GameUserID",
                table: "AspNetUsers",
                column: "GameUserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersFriendships_ApplicationUserFriendId",
                table: "ApplicationUsersFriendships",
                column: "ApplicationUserFriendId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersFriendships_ApplicationUserId",
                table: "ApplicationUsersFriendships",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComments_ApplicationUserId",
                table: "ForumComments",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComments_ForumThreadID",
                table: "ForumComments",
                column: "ForumThreadID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLikes_ApplicationUserId",
                table: "ForumLikes",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLikes_ForumCommentID",
                table: "ForumLikes",
                column: "ForumCommentID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumLikes_ForumThreadID",
                table: "ForumLikes",
                column: "ForumThreadID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ApplicationUserId",
                table: "ForumThreads",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ApplicationUserId1",
                table: "ForumThreads",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ForumTopicID",
                table: "ForumThreads",
                column: "ForumTopicID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ForumTopicID1",
                table: "ForumThreads",
                column: "ForumTopicID1");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_PinnedForumThreadsID",
                table: "ForumThreads",
                column: "PinnedForumThreadsID");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_GameUsers_GameUserID",
                table: "AspNetUsers",
                column: "GameUserID",
                principalTable: "GameUsers",
                principalColumn: "GameUserID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_GameUsers_GameUserID",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GameUserID",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AvatarImageURL",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GameUserID",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ApplicationUsersFriendships");

            migrationBuilder.DropTable(
                name: "ForumLikes");

            migrationBuilder.DropTable(
                name: "GameLores");

            migrationBuilder.DropTable(
                name: "GameUsers");

            migrationBuilder.DropTable(
                name: "ForumComments");

            migrationBuilder.DropTable(
                name: "ForumThreads");

            migrationBuilder.DropTable(
                name: "ForumTopics");

            migrationBuilder.DropTable(
                name: "PinnedForumThreads");
        }
    }
}
