import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateDepartmentDto } from '../../dtos/create-department.dto';
import { DepartmentDto } from '../../dtos/department.dto';
import { httpErrorHandler } from '../functions/http-error-handler.function';
import { CustomHttpParams } from '../models/custom-http-params';


@Injectable( {
               providedIn: 'root',
             } )
export class DepartmentsService {

  constructor(private readonly http: HttpClient,
  ) {
  }

  getAllDepartments(): Observable<DepartmentDto[]> {
    const params = new CustomHttpParams( true );
    return this.http.get<DepartmentDto[]>( environment.departments, { params } )
               .pipe(
                 catchError( err => httpErrorHandler( err ) ),
               );
  }

  createDepartment(data: CreateDepartmentDto): Observable<DepartmentDto> {
    const params = new CustomHttpParams( true );
    return this.http.post<DepartmentDto>( environment.departments, data, { params } )
               .pipe(
                 catchError( err => httpErrorHandler( err ) ),
               );
  }
}
