﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.DepartmentDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using ApplicationLayer.DTOs.PatientDto;
using AutoMapper;
using DomainLayer.Entities;

namespace ApplicationLayer.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Appointment -> AppointmentReadDto
            /*CreateMap<Appointment, AppointmentReadDto>()
                .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.Emri))
                .ForMember(dest => dest.DentistName, opt => opt.MapFrom(src => src.Dentist.Emri));

            // AppointmentCreateDto -> Appointment
            CreateMap<AppointmentCreateDto, Appointment>();

            // AppointmentUpdateDto -> Appointment
            CreateMap<AppointmentUpdateDto, Appointment>();*/

            //Patient
            CreateMap<PatientCreateDto, Patient>();
            CreateMap<PatientUpdateDto, Patient>();
            CreateMap<Patient, PatientReadDto>();

            CreateMap<DentistCreateDto, Dentist>();
            CreateMap<DentistUpdateDto, Dentist>();
            CreateMap<Dentist, DentistReadDto>();

            CreateMap<MedicalRecordCreateDto, MedicalRecord>();
            CreateMap<MedicalRecordUpdateDto, MedicalRecord>();
            CreateMap<MedicalRecord, MedicalRecordReadDto>();

            CreateMap<DepartmentReadDto, Department>();
            CreateMap<DepartmentCreateDto, Department>();
            CreateMap<Department, DepartmentUpdateDto>();
        }
    }
}

