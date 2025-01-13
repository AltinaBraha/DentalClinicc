using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InfrastructureLayer.Migrations
{
    /// <inheritdoc />
    public partial class setNullImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Images_ImageId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Images_ImageId",
                table: "Dentists");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Images_ImageId",
                table: "Patients");

            migrationBuilder.AddColumn<int>(
                name: "ImageId1",
                table: "Patients",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageId1",
                table: "Dentists",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageId1",
                table: "Admins",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_ImageId1",
                table: "Patients",
                column: "ImageId1");

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_ImageId1",
                table: "Dentists",
                column: "ImageId1");

            migrationBuilder.CreateIndex(
                name: "IX_Admins_ImageId1",
                table: "Admins",
                column: "ImageId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Images_ImageId",
                table: "Admins",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Images_ImageId1",
                table: "Admins",
                column: "ImageId1",
                principalTable: "Images",
                principalColumn: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Images_ImageId",
                table: "Dentists",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Images_ImageId1",
                table: "Dentists",
                column: "ImageId1",
                principalTable: "Images",
                principalColumn: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Images_ImageId",
                table: "Patients",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Images_ImageId1",
                table: "Patients",
                column: "ImageId1",
                principalTable: "Images",
                principalColumn: "ImageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Images_ImageId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Images_ImageId1",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Images_ImageId",
                table: "Dentists");

            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Images_ImageId1",
                table: "Dentists");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Images_ImageId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Images_ImageId1",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_ImageId1",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_ImageId1",
                table: "Dentists");

            migrationBuilder.DropIndex(
                name: "IX_Admins_ImageId1",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "ImageId1",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "ImageId1",
                table: "Dentists");

            migrationBuilder.DropColumn(
                name: "ImageId1",
                table: "Admins");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Images_ImageId",
                table: "Admins",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Images_ImageId",
                table: "Dentists",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Images_ImageId",
                table: "Patients",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId");
        }
    }
}
