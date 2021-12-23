import { createAction, props } from '@ngrx/store';
import { EmailAuthDto } from '../../dtos/email-auth.dto';
import { RegisterUserDto } from '../../dtos/register-user.dto';
import { UserDto,  } from '../../dtos/user.dto';
import { SuccessfulLoginDto } from '../../dtos/successful-login.dto';

export const login = createAction(
    '[Auth] Login user',
    props<{ credentials: EmailAuthDto  }>()
);

export const userLogInSuccess = createAction(
    '[API/Auth] User Login Success',
    props<{ data: SuccessfulLoginDto }>()
);

export const userLogInFailed = createAction(
    '[Auth] Failed To LogIn User',
    props<{ error: any }>()
);

export const registerUser = createAction(
    '[Auth] Register user',
    props<{ credentials: RegisterUserDto  }>()
);

export const registeredUserSuccess = createAction(
    '[API/Auth] User Registered Success',
    props<{ data: UserDto }>()
);

export const failedToRegisterUser = createAction(
    '[Auth] Failed To Register User',
    props<{ error: any }>()
);

export const clearAuthErrorsAndSuccess = createAction(
    '[Login Page/Auth] Clear Auth Errors and Success'
);

export const clearRegisterErrorsAndSuccess = createAction(
    '[Register Page/Auth] Clear Register Errors and Success'
);

export const logout = createAction(
    '[App Header/ Logout]'
);

