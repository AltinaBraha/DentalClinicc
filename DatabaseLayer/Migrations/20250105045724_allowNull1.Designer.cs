﻿// <auto-generated />
using System;
using DatabaseLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DatabaseLayer.Migrations
{
    [DbContext(typeof(ClinicDbContext))]
    [Migration("20250105045724_allowNull1")]
    partial class allowNull1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DomainLayer.Entities.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminId"));

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.HasKey("AdminId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("ImageId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("DomainLayer.Entities.Appointment", b =>
                {
                    b.Property<int>("AppointmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AppointmentId"));

                    b.Property<string>("Ceshtja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Data")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DentistId")
                        .HasColumnType("int");

                    b.Property<int?>("DentistId1")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeOnly?>("Ora")
                        .HasColumnType("time");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<int?>("PatientId1")
                        .HasColumnType("int");

                    b.HasKey("AppointmentId");

                    b.HasIndex("DentistId");

                    b.HasIndex("DentistId1");

                    b.HasIndex("PatientId");

                    b.HasIndex("PatientId1");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("DomainLayer.Entities.Clinic", b =>
                {
                    b.Property<int>("ClinicId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ClinicId"));

                    b.Property<string>("ClinicName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ClinicId");

                    b.ToTable("Clinics");
                });

            modelBuilder.Entity("DomainLayer.Entities.Complaints", b =>
                {
                    b.Property<int>("ComplaintsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ComplaintsId"));

                    b.Property<string>("Ankesa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("ComplaintsId");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Complaint");
                });

            modelBuilder.Entity("DomainLayer.Entities.Contact", b =>
                {
                    b.Property<int>("ContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ContactId"));

                    b.Property<string>("Mesazhi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("MessageDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("ContactId");

                    b.HasIndex("PatientId");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("DomainLayer.Entities.Dentist", b =>
                {
                    b.Property<int>("DentistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DentistId"));

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Mosha")
                        .HasColumnType("int");

                    b.Property<int>("NrTelefonit")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("OraFillimit")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("OraMbarimit")
                        .HasColumnType("time");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Specializimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DentistId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("ImageId");

                    b.ToTable("Dentists");
                });

            modelBuilder.Entity("DomainLayer.Entities.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartmentId"));

                    b.Property<int>("ClinicId")
                        .HasColumnType("int");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DepartmentId");

                    b.HasIndex("ClinicId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("DomainLayer.Entities.Image", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImageId"));

                    b.Property<string>("FileDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileExtension")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("FileSizeInBytes")
                        .HasColumnType("bigint");

                    b.HasKey("ImageId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("DomainLayer.Entities.MedicalRecord", b =>
                {
                    b.Property<int>("MedicalRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MedicalRecordId"));

                    b.Property<int?>("DentistId")
                        .HasColumnType("int");

                    b.Property<int?>("DentistId1")
                        .HasColumnType("int");

                    b.Property<string>("Diagnosis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<int?>("PatientId1")
                        .HasColumnType("int");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Results")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Symptoms")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MedicalRecordId");

                    b.HasIndex("DentistId");

                    b.HasIndex("DentistId1");

                    b.HasIndex("PatientId");

                    b.HasIndex("PatientId1");

                    b.ToTable("MedicalRecords");
                });

            modelBuilder.Entity("DomainLayer.Entities.Patient", b =>
                {
                    b.Property<int>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PatientId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Mosha")
                        .HasColumnType("int");

                    b.Property<int>("NrTelefonit")
                        .HasColumnType("int");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.HasKey("PatientId");

                    b.HasIndex("ImageId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("DomainLayer.Entities.Prescription", b =>
                {
                    b.Property<int>("PrescriptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PrescriptionId"));

                    b.Property<int?>("DentistId")
                        .HasColumnType("int");

                    b.Property<int?>("DentistId1")
                        .HasColumnType("int");

                    b.Property<string>("Diagnoza")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Medicina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<int?>("PatientId1")
                        .HasColumnType("int");

                    b.HasKey("PrescriptionId");

                    b.HasIndex("DentistId");

                    b.HasIndex("DentistId1");

                    b.HasIndex("PatientId");

                    b.HasIndex("PatientId1");

                    b.ToTable("Prescriptions");
                });

            modelBuilder.Entity("DomainLayer.Entities.Rating", b =>
                {
                    b.Property<int>("RatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RatingId"));

                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("Sherbimi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("sjellja")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RatingId");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("DomainLayer.Entities.SmtpSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("EnableSsl")
                        .HasColumnType("bit");

                    b.Property<string>("Host")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Port")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SmtpSettingss");
                });

            modelBuilder.Entity("DomainLayer.Entities.Admin", b =>
                {
                    b.HasOne("DomainLayer.Entities.Department", "Department")
                        .WithMany("Admins")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainLayer.Entities.Image", "Image")
                        .WithMany("Admins")
                        .HasForeignKey("ImageId");

                    b.Navigation("Department");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("DomainLayer.Entities.Appointment", b =>
                {
                    b.HasOne("DomainLayer.Entities.Dentist", "Dentist")
                        .WithMany()
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Dentist", null)
                        .WithMany("Appointments")
                        .HasForeignKey("DentistId1");

                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Patient", null)
                        .WithMany("Appointments")
                        .HasForeignKey("PatientId1");

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Complaints", b =>
                {
                    b.HasOne("DomainLayer.Entities.Dentist", "Dentist")
                        .WithMany("Complaint")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany("Complaint")
                        .HasForeignKey("PatientId");

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Contact", b =>
                {
                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany("Contacts")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Dentist", b =>
                {
                    b.HasOne("DomainLayer.Entities.Department", "Department")
                        .WithMany("Dentists")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainLayer.Entities.Image", "Image")
                        .WithMany("Dentists")
                        .HasForeignKey("ImageId");

                    b.Navigation("Department");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("DomainLayer.Entities.Department", b =>
                {
                    b.HasOne("DomainLayer.Entities.Clinic", "Clinic")
                        .WithMany("Departments")
                        .HasForeignKey("ClinicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Clinic");
                });

            modelBuilder.Entity("DomainLayer.Entities.MedicalRecord", b =>
                {
                    b.HasOne("DomainLayer.Entities.Dentist", "Dentist")
                        .WithMany()
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Dentist", null)
                        .WithMany("MedicalRecords")
                        .HasForeignKey("DentistId1");

                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Patient", null)
                        .WithMany("MedicalRecords")
                        .HasForeignKey("PatientId1");

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Patient", b =>
                {
                    b.HasOne("DomainLayer.Entities.Image", "Image")
                        .WithMany("Patients")
                        .HasForeignKey("ImageId");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("DomainLayer.Entities.Prescription", b =>
                {
                    b.HasOne("DomainLayer.Entities.Dentist", "Dentist")
                        .WithMany()
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Dentist", null)
                        .WithMany("Prescriptions")
                        .HasForeignKey("DentistId1");

                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("DomainLayer.Entities.Patient", null)
                        .WithMany("Prescriptions")
                        .HasForeignKey("PatientId1");

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Rating", b =>
                {
                    b.HasOne("DomainLayer.Entities.Dentist", "Dentist")
                        .WithMany("Ratings")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainLayer.Entities.Patient", "Patient")
                        .WithMany("Ratings")
                        .HasForeignKey("PatientId");

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("DomainLayer.Entities.Clinic", b =>
                {
                    b.Navigation("Departments");
                });

            modelBuilder.Entity("DomainLayer.Entities.Dentist", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("Complaint");

                    b.Navigation("MedicalRecords");

                    b.Navigation("Prescriptions");

                    b.Navigation("Ratings");
                });

            modelBuilder.Entity("DomainLayer.Entities.Department", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Dentists");
                });

            modelBuilder.Entity("DomainLayer.Entities.Image", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Dentists");

                    b.Navigation("Patients");
                });

            modelBuilder.Entity("DomainLayer.Entities.Patient", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("Complaint");

                    b.Navigation("Contacts");

                    b.Navigation("MedicalRecords");

                    b.Navigation("Prescriptions");

                    b.Navigation("Ratings");
                });
#pragma warning restore 612, 618
        }
    }
}
