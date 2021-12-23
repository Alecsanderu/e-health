import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { DoctorDto } from '../../dtos/doctor.dto';
import { httpErrorHandler } from '../functions/http-error-handler.function';
import { CustomHttpParams } from '../models/custom-http-params';


@Injectable( {
                 providedIn: 'root',
             } )
export class DoctorsService {

    constructor(
        private readonly http: HttpClient,
    ) {
    }

    getAllDoctors(): Observable<DoctorDto[]> {
        const params = new CustomHttpParams( true );
        return this.http.get<DoctorDto[]>( environment.doctors, { params } )
                   .pipe(
                       catchError( err => httpErrorHandler( err ) ),
                   );
    }

    createDoctor(data: CreateDoctorDto): Observable<DoctorDto> {
        const params = new CustomHttpParams( true );
        return this.http.post<DoctorDto>( environment.doctors, data, { params } )
                   .pipe(
                       catchError( err => httpErrorHandler( err ) ),
                   );
    }
}
