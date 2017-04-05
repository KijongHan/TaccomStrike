using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AvaNet.Data.Migrations
{
    public partial class removedforumthreadidfromforumlikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ForumThreads",
                maxLength: 60,
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ForumThreadID",
                table: "ForumLikes",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ForumThreads",
                maxLength: 300,
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ForumThreadID",
                table: "ForumLikes",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
