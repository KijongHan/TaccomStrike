using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AvaNet.Data.Migrations
{
    public partial class addedcreationtimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ForumThreadCreationTime",
                table: "ForumThreads",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ForumCommentCreationTime",
                table: "ForumComments",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ForumThreads",
                maxLength: 300,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumThreads",
                maxLength: 1500,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumComments",
                maxLength: 1500,
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForumThreadCreationTime",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "ForumCommentCreationTime",
                table: "ForumComments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ForumThreads",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumThreads",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumComments",
                nullable: true);
        }
    }
}
