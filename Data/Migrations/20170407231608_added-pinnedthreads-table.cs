using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AvaNet.Data.Migrations
{
    public partial class addedpinnedthreadstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "PinnedForumThreadsID",
                table: "ForumThreads",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_PinnedForumThreadsID",
                table: "ForumThreads",
                column: "PinnedForumThreadsID");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumThreads_PinnedForumThreads_PinnedForumThreadsID",
                table: "ForumThreads",
                column: "PinnedForumThreadsID",
                principalTable: "PinnedForumThreads",
                principalColumn: "PinnedForumThreadsID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumThreads_PinnedForumThreads_PinnedForumThreadsID",
                table: "ForumThreads");

            migrationBuilder.DropIndex(
                name: "IX_ForumThreads_PinnedForumThreadsID",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "PinnedForumThreadsID",
                table: "ForumThreads");

            migrationBuilder.DropTable(
                name: "PinnedForumThreads");
        }
    }
}
