import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { httpErrorHandler } from '../functions/http-error-handler.function';
import { LoginDto } from '../../dtos/login.dto';
import { SuccessfulLoginDto } from '../../dtos/successful-login.dto';
import { RegisterUserDto } from '../../dtos/register-user.dto';
import { UserDto } from '../../dtos/user.dto';
import * as AuthSelectors from '../../store/selectors/auth.selectors'


@Injectable({
                providedIn: 'root'
            })
export class AuthService {

    private _jwtToken: string;

    constructor(
        private readonly store: Store<AppState>,
        private readonly http: HttpClient
    ) {
        this._jwtToken = '';
        this.subscribeForJwtTokenChanges();
    }
    

    login(credentials: LoginDto): Observable<SuccessfulLoginDto> {
        return this.http.post<SuccessfulLoginDto>(environment.userAuth.login,
                                                               {email: credentials.email, password: credentials.password})
                   .pipe(
                       catchError(err => httpErrorHandler(err))
                   );
    }
    


    register(credentials: RegisterUserDto): Observable<UserDto> {
        return this.http.post<UserDto>(environment.register,
                                            {
                                                email: credentials.email,
                                                password: credentials.password,
                                                phone: credentials.phone,
                                                name: credentials.name,
                                                address: credentials.address
                                            })
                   .pipe(
                       catchError(err => httpErrorHandler(err))
                   );
    }

    subscribeForJwtTokenChanges(): void {
        this.store.select(AuthSelectors.jwtToken)
            .subscribe(token => this._jwtToken = token!);
    }

    getJwtToken(): string {
        return this._jwtToken;
    }
}
