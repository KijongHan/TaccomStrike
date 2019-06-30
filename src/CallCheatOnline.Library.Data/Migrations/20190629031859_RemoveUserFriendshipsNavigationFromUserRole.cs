using Microsoft.EntityFrameworkCore.Migrations;

namespace CallCheatOnline.Library.Data.Migrations
{
	public partial class RemoveUserFriendshipsNavigationFromUserRole : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_UserFriendship_UserRole_UserRoleID",
				schema: "auth",
				table: "UserFriendship");

			migrationBuilder.DropIndex(
				name: "IX_UserFriendship_UserRoleID",
				schema: "auth",
				table: "UserFriendship");

			migrationBuilder.DropColumn(
				name: "UserRoleID",
				schema: "auth",
				table: "UserFriendship");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<int>(
				name: "UserRoleID",
				schema: "auth",
				table: "UserFriendship",
				nullable: true);

			migrationBuilder.CreateIndex(
				name: "IX_UserFriendship_UserRoleID",
				schema: "auth",
				table: "UserFriendship",
				column: "UserRoleID");

			migrationBuilder.AddForeignKey(
				name: "FK_UserFriendship_UserRole_UserRoleID",
				schema: "auth",
				table: "UserFriendship",
				column: "UserRoleID",
				principalSchema: "auth",
				principalTable: "UserRole",
				principalColumn: "UserRoleID",
				onDelete: ReferentialAction.Restrict);
		}
	}
}
