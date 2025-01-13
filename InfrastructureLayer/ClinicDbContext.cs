using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace InfrastructureLayer
{
    public class ClinicDbContext : DbContext
    {
        public ClinicDbContext(DbContextOptions<ClinicDbContext> options) : base(options)
        {

        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Dentist> Dentists { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Complaints> Complaint { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        public DbSet<Clinic> Clinics { get; set; }

        public DbSet<SmtpSettings> SmtpSettingss { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the relationship for Prescription
            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Patient)
                .WithMany()
                .HasForeignKey(p => p.PatientId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Dentist)
                .WithMany()
                .HasForeignKey(p => p.DentistId)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure the relationship for MedicalRecord
            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Patient)
                .WithMany()
                .HasForeignKey(m => m.PatientId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Dentist)
                .WithMany()
                .HasForeignKey(m => m.DentistId)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure the relationship for Appointment
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany()
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Dentist)
                .WithMany()
                .HasForeignKey(a => a.DentistId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Dentist>()
                .HasOne(p => p.Image)
                .WithMany()
                .HasForeignKey(p => p.ImageId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Patient>()
               .HasOne(p => p.Image)
               .WithMany()
               .HasForeignKey(p => p.ImageId)
               .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Admin>()
               .HasOne(p => p.Image)
               .WithMany()
               .HasForeignKey(p => p.ImageId)
               .OnDelete(DeleteBehavior.SetNull);
        }

    }
}
