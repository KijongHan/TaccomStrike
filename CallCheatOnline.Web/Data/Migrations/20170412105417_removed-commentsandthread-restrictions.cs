using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AvaNet.Data.Migrations
{
    public partial class removedcommentsandthreadrestrictions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumThreads",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "ForumComments",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
