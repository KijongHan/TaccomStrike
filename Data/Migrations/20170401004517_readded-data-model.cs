using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AvaNet.Data.Migrations
{
    public partial class readdeddatamodel : Migration
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
                    Title = table.Column<string>(maxLength: 300, nullable: false)
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
                    ForumThreadID = table.Column<int>(nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ForumThreadLikes",
                columns: table => new
                {
                    ForumThreadLikeID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ForumCommentID = table.Column<int>(nullable: true),
                    ForumThreadID = table.Column<int>(nullable: false),
                    Weight = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumThreadLikes", x => x.ForumThreadLikeID);
                    table.ForeignKey(
                        name: "FK_ForumThreadLikes_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumThreadLikes_ForumComments_ForumCommentID",
                        column: x => x.ForumCommentID,
                        principalTable: "ForumComments",
                        principalColumn: "ForumCommentID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ForumThreadLikes_ForumThreads_ForumThreadID",
                        column: x => x.ForumThreadID,
                        principalTable: "ForumThreads",
                        principalColumn: "ForumThreadID",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_ForumThreadLikes_ApplicationUserId",
                table: "ForumThreadLikes",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreadLikes_ForumCommentID",
                table: "ForumThreadLikes",
                column: "ForumCommentID");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreadLikes_ForumThreadID",
                table: "ForumThreadLikes",
                column: "ForumThreadID");

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
                name: "GameUserID",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ApplicationUsersFriendships");

            migrationBuilder.DropTable(
                name: "ForumThreadLikes");

            migrationBuilder.DropTable(
                name: "GameUsers");

            migrationBuilder.DropTable(
                name: "ForumComments");

            migrationBuilder.DropTable(
                name: "ForumThreads");

            migrationBuilder.DropTable(
                name: "ForumTopics");
        }
    }
}
