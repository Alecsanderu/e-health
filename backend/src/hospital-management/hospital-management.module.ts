import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDepartmentHandler } from '~hospital-management/commands/handlers/departments/create-department.handler';
import { CreateDoctorHandler } from '~hospital-management/commands/handlers/doctors/create-doctor.handler';
import { CheckOutPatientHandler } from '~hospital-management/commands/handlers/patients/check-out-patient.handler';
import { CreatePatientHandler } from '~hospital-management/commands/handlers/patients/create-patient.handler';
import { DepartmentController } from '~hospital-management/controllers/department.controller';
import { DoctorController } from '~hospital-management/controllers/doctor.controller';
import { PatientController } from '~hospital-management/controllers/patient.controller';
import { DepartmentEntity } from '~hospital-management/entities/department.entity';
import { DoctorEntity } from '~hospital-management/entities/doctor.entity';
import { PatientEntity } from '~hospital-management/entities/patient.entity';
import { GetAllDepartmentsHandler } from '~hospital-management/queries/handlers/departments/get-all-departments.handler';
import { GetAllDoctorsHandler } from '~hospital-management/queries/handlers/doctors/get-all-doctors.handler';
import { GetAllPatientsHandler } from '~hospital-management/queries/handlers/patients/get-all-patients.handler';
import { DepartmentRepository } from '~hospital-management/repositories/department.repository';
import { DoctorRepository } from '~hospital-management/repositories/doctor.repository';
import { PatientRepository } from '~hospital-management/repositories/patient.repository';
import { DepartmentService } from '~hospital-management/services/department.service';
import { DoctorService } from '~hospital-management/services/doctor.service';
import { PatientService } from '~hospital-management/services/patient.service';

const Controllers = [
    DepartmentController,
    DoctorController,
    PatientController,
];

const Entities = [
    DepartmentEntity,
    DoctorEntity,
    PatientEntity,
];

const CommandHandlers = [
    CreateDepartmentHandler,
    CreateDoctorHandler,
    CreatePatientHandler,
    CheckOutPatientHandler,
];

const QueryHandlers = [
    GetAllDoctorsHandler,
    GetAllPatientsHandler,
    GetAllDepartmentsHandler,
];

const Services = [
    DepartmentService,
    DoctorService,
    PatientService,
];

const Repositories = [
    DepartmentRepository,
    DoctorRepository,
    PatientRepository,
];

@Module( {
             controllers: [ ...Controllers ],
             providers  : [
                 ...CommandHandlers,
                 ...QueryHandlers,
                 ...Services,
                 ...Repositories,
             ],
             imports    : [
                 CqrsModule,
                 TypeOrmModule.forFeature( [ ...Entities ] ),
             ],
         } )
export class HospitalManagementModule {

}
