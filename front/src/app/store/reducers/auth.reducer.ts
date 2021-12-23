import { createReducer, on } from '@ngrx/store';
import { isDefined } from '../../config/functions/is-defined';
import { JwtTokenDto } from '../../dtos/jwt-token.dto';
import { UserDto } from '../../dtos/user.dto';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

const getJwtTokenFromLocalStorage = (): JwtTokenDto | null => {
    const token = localStorage.getItem( 'JWT_TOKEN' );
    return isDefined( token )
           ? JSON.parse( token )
           : null;
};

export interface AuthState {
    login: {
        loading: boolean;
        jwtToken: JwtTokenDto | null;
        error: any
        success: boolean;
        user: UserDto | null;
    };
    registration: {
        loading: boolean;
        registeredUser: UserDto | null;
        error: any;
        success: boolean;
    };

}

export const initialState: AuthState = {

    login       : {
        loading : false,
        jwtToken: getJwtTokenFromLocalStorage(),
        error   : null,
        success : false,
        user    : null,
    },
    registration: {
        loading       : false,
        registeredUser: null,
        error         : null,
        success       : false,
    },

};

export const reducer = createReducer(
    initialState,

    on( AuthActions.registerUser,
        state => (
            {
                ...state,
                registration: {
                    ...state.registration,
                    loading: true,
                },
            }
        ),
    ),
    on( AuthActions.registeredUserSuccess,
        (state, { data }) => (
            {
                ...state,
                registration: {
                    ...state.registration,
                    loading       : false,
                    registeredUser: data,
                    success       : true,
                },
            }
        ),
    ),
    on( AuthActions.failedToRegisterUser,
        (state, { error }) => (
            {
                ...state,
                registration: {
                    ...state.registration,
                    loading: false,
                    error,
                },
            }
        ),
    ),
    on( AuthActions.login,
        state => (
            {
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                },
            }
        ),
    ),
    on( AuthActions.userLogInSuccess,
        (state, { data }) => (
            {
                ...state,
                login: {
                    ...state.login,
                    loading : false,
                    success : true,
                    jwtToken: data.authToken,
                    user    : data.user,
                },
            }
        ),
    ),
    on( AuthActions.userLogInFailed,
        (state, { error }) => (
            {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error,
                },
            }
        ),
    ),
    on( AuthActions.clearAuthErrorsAndSuccess,
        (state) => (
            {
                ...state,
                login:
                    {
                        ...state.login,
                        error  : null,
                        success: false,
                    },
            }
        ) ),
    on( AuthActions.clearRegisterErrorsAndSuccess,
        (state) => (
            {
                ...state,
                registration:
                    {
                        ...state.registration,
                        error  : null,
                        success: false,
                    },
            }
        ) ),
    on( AuthActions.logout,
        () => (
            { ...initialState }
        ) ),
);
