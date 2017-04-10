using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AvaNet.Data.Migrations
{
    public partial class cascadedeleteforumcomments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments",
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

            migrationBuilder.AddForeignKey(
                name: "FK_ForumComments_ForumThreads_ForumThreadID",
                table: "ForumComments",
                column: "ForumThreadID",
                principalTable: "ForumThreads",
                principalColumn: "ForumThreadID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
