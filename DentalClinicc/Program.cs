using Microsoft.EntityFrameworkCore;
using DatabaseLayer;
using ApplicationLayer.Mappings;
using AutoMapper;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DatabaseLayer.Repositories;
using DomainLayer.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));


// Regjistrimi i shërbimit të AppointmentService
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IDentistService, DentistService>();
builder.Services.AddScoped<IMedicalRecordService, MedicalRecordService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IComplaintsService, ComplaintsService>();



//Regjistrimi i Repositoryt
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IDentistRepository, DentistRepository>();
builder.Services.AddScoped<IMedicalRecordRepository, MedicalRecordRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IComplaintsRepository, ComplaintsRepository>();


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




builder.Services.AddDbContext<ClinicDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("ClinicConnectionString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
