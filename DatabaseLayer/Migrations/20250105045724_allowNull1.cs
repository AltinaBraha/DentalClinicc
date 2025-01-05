using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseLayer.Migrations
{
    /// <inheritdoc />
    public partial class allowNull1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Dentists_DentistId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions");

            migrationBuilder.AddColumn<int>(
                name: "DentistId1",
                table: "Prescriptions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PatientId1",
                table: "Prescriptions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DentistId1",
                table: "MedicalRecords",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PatientId1",
                table: "MedicalRecords",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DentistId1",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PatientId1",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_DentistId1",
                table: "Prescriptions",
                column: "DentistId1");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_PatientId1",
                table: "Prescriptions",
                column: "PatientId1");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_DentistId1",
                table: "MedicalRecords",
                column: "DentistId1");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_PatientId1",
                table: "MedicalRecords",
                column: "PatientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_DentistId1",
                table: "Appointments",
                column: "DentistId1");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_PatientId1",
                table: "Appointments",
                column: "PatientId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Dentists_DentistId",
                table: "Appointments",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Dentists_DentistId1",
                table: "Appointments",
                column: "DentistId1",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_PatientId1",
                table: "Appointments",
                column: "PatientId1",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId",
                table: "MedicalRecords",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId1",
                table: "MedicalRecords",
                column: "DentistId1",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId1",
                table: "MedicalRecords",
                column: "PatientId1",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId",
                table: "Prescriptions",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId1",
                table: "Prescriptions",
                column: "DentistId1",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Patients_PatientId1",
                table: "Prescriptions",
                column: "PatientId1",
                principalTable: "Patients",
                principalColumn: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Dentists_DentistId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Dentists_DentistId1",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_PatientId1",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId1",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId1",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId1",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Patients_PatientId1",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_DentistId1",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_PatientId1",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_MedicalRecords_DentistId1",
                table: "MedicalRecords");

            migrationBuilder.DropIndex(
                name: "IX_MedicalRecords_PatientId1",
                table: "MedicalRecords");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_DentistId1",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_PatientId1",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "DentistId1",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "DentistId1",
                table: "MedicalRecords");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "MedicalRecords");

            migrationBuilder.DropColumn(
                name: "DentistId1",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "Appointments");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Dentists_DentistId",
                table: "Appointments",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Dentists_DentistId",
                table: "MedicalRecords",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Dentists_DentistId",
                table: "Prescriptions",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Patients_PatientId",
                table: "Prescriptions",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");
        }
    }
}
