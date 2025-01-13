using Microsoft.EntityFrameworkCore;
using InfrastructureLayer;
using ApplicationLayer.Mappings;
using AutoMapper;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Interfaces;
using InfrastructureLayer.Repositories;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using SendGrid;
using DomainLayer.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

// Regjistrimi i shërbimit të AppointmentService
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IDentistService, DentistService>();
builder.Services.AddScoped<IMedicalRecordService, MedicalRecordService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IComplaintsService, ComplaintsService>();
builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IClinicService, ClinicService>();
builder.Services.AddScoped<MailService>();


//Regjistrimi i Repositoryt
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IDentistRepository, DentistRepository>();
builder.Services.AddScoped<IMedicalRecordRepository, MedicalRecordRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IComplaintsRepository, ComplaintsRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IRatingRepository, RatingRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IClinicRepository, ClinicRepository>();

var tokenKey = builder.Configuration["AppSettings:Token"]; // Ensure this is set in appsettings.json
var key = Encoding.UTF8.GetBytes(tokenKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3001") // Add frontend URLs
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Use AllowCredentials only if necessary
    });
});

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();




builder.Services.AddDbContext<ClinicDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("ClinicConnectionString")));


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Dental Clinic API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigin");

app.UseRouting();
app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles(); // Enable static file serving
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

app.MapControllers();

app.Run();
