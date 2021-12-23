import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePatientDto } from '../../dtos/create-patient.dto';
import { PatientDto } from '../../dtos/patient.dto';
import { httpErrorHandler } from '../functions/http-error-handler.function';
import { CustomHttpParams } from '../models/custom-http-params';


@Injectable( {
                 providedIn: 'root',
             } )
export class PatientsService {


    constructor(
        private readonly http: HttpClient,
    ) {
    }


    getPatients(): Observable<PatientDto[]> {
        const params = new CustomHttpParams( true );
        return this.http.get<PatientDto[]>( environment.patients, { params } )
                   .pipe(
                       catchError( err => httpErrorHandler( err ) ),
                   );
    }

    createPatient(data: CreatePatientDto): Observable<PatientDto> {
        const params = new CustomHttpParams( true );
        return this.http.post<PatientDto>( environment.patients, data, { params } )
                   .pipe(
                       catchError( err => httpErrorHandler( err ) ),
                   );
    }

    checkOutPatient(patientId: string): Observable<PatientDto> {
        const params = new CustomHttpParams( true );
        return this.http.post<PatientDto>( `${ environment.patients }/${ patientId }/check-out`, {}, { params } )
                   .pipe(
                       catchError( err => httpErrorHandler( err ) ),
                   );
    }


}
