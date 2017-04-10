using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AvaNet.Data.Migrations
{
    public partial class removedunnecessaryattributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID1",
                table: "ForumComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes");

            migrationBuilder.DropIndex(
                name: "IX_ForumComments_ForumThreadID1",
                table: "ForumComments");

            migrationBuilder.DropColumn(
                name: "ForumThreadID1",
                table: "ForumComments");

            migrationBuilder.AlterColumn<int>(
                name: "ForumThreadID",
                table: "ForumComments",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes");

            migrationBuilder.AddColumn<int>(
                name: "ForumThreadID1",
                table: "ForumComments",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ForumThreadID",
                table: "ForumComments",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_ForumComments_ForumThreadID1",
                table: "ForumComments",
                column: "ForumThreadID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID1",
                table: "ForumComments",
                column: "ForumThreadID1",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ForumLikes_ForumThreads_ForumThreadID",
                table: "ForumLikes",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
