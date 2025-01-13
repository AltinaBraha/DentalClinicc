using ApplicationLayer.DTOs;
using ApplicationLayer.DTOs.AppointmentDto;
using ApplicationLayer.DTOs.MedicalRecordDto;
using ApplicationLayer.Interfaces;
using AutoMapper;
using InfrastructureLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.Services
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly IMedicalRecordRepository _medicalRecordRepository;
        private readonly IMapper _mapper;

        public MedicalRecordService(IMedicalRecordRepository medicalRecordRepository, IMapper mapper)
        {
            _medicalRecordRepository = medicalRecordRepository;
            _mapper = mapper;
        }

        public async Task<MedicalRecordReadDto> GetMedicalRecordByIdAsync(int id)
        {
            var medicalRecord = await _medicalRecordRepository.GetByIdAsync(id);
            return _mapper.Map<MedicalRecordReadDto>(medicalRecord);
        }

        public async Task<List<MedicalRecordReadDto>> GetByDentistIdAsync(int dentistId)
        {
            var medicalRecords = await _medicalRecordRepository.GetByDentistIdAsync(dentistId);
            return _mapper.Map<List<MedicalRecordReadDto>>(medicalRecords);
        }

        public async Task<List<MedicalRecordReadDto>> GetByPatientIdAsync(int patientId)
        {
            var medicalRecords = await _medicalRecordRepository.GetByPatientIdAsync(patientId);
            return _mapper.Map<List<MedicalRecordReadDto>>(medicalRecords);
        }

        public async Task<List<MedicalRecordReadDto>> GetAllMedicalRecordsAsync()
        {
            var medicalRecords = await _medicalRecordRepository.GetAllAsync();
            return _mapper.Map<List<MedicalRecordReadDto>>(medicalRecords);
        }

        public async Task<MedicalRecordReadDto> CreateMedicalRecordAsync(MedicalRecordCreateDto medicalRecordDto)
        {
            var medicalRecord = _mapper.Map<MedicalRecord>(medicalRecordDto);
            var createdMedicalRecord = await _medicalRecordRepository.AddAsync(medicalRecord);
            return _mapper.Map<MedicalRecordReadDto>(createdMedicalRecord);
        }

        public async Task<MedicalRecordReadDto> UpdateMedicalRecordAsync(MedicalRecordUpdateDto medicalRecordDto)
        {
            var medicalRecord = await _medicalRecordRepository.GetByIdAsync(medicalRecordDto.MedicalRecordId);

            if (medicalRecord == null)
            {
                return null; 
            }

            medicalRecord.Pershkrimi = medicalRecordDto.Pershkrimi;
            medicalRecord.Symptoms = medicalRecordDto.Symptoms;
            medicalRecord.Diagnosis = medicalRecordDto.Diagnosis;
            medicalRecord.Results = medicalRecordDto.Results;

            

            var updatedMedicalRecord = await _medicalRecordRepository.UpdateAsync(medicalRecord);

            return _mapper.Map<MedicalRecordReadDto>(updatedMedicalRecord);
        }

        public async Task DeleteMedicalRecordAsync(int id)
        {
            await _medicalRecordRepository.DeleteAsync(id);
        }
    }
}
