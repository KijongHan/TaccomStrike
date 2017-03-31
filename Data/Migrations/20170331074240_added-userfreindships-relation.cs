using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AvaNet.Data.Migrations
{
    public partial class addeduserfreindshipsrelation : Migration
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

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersFriendships_ApplicationUserFriendId",
                table: "ApplicationUsersFriendships",
                column: "ApplicationUserFriendId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersFriendships_ApplicationUserId",
                table: "ApplicationUsersFriendships",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUsersFriendships");
        }
    }
}
