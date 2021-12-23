import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CustomHttpParams } from '../models/custom-http-params';
import { AuthService } from '../services/auth.service';


@Injectable()
export class RequestHeadersHttpInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const params = req.params as CustomHttpParams;

    let headers = req.headers
                     .set('Accept', 'application/json');

    if (params.requiresAuthentication) {
      
      const jwt = this.authService.getJwtToken();
      
      headers = headers.append('Authorization', `Bearer ${jwt}`);
    }

    if (params.captchaToken) {
      headers = headers.append('X-CAPTCHA-TOKEN', params.captchaToken);
    }

    const newRequest = req.clone({headers});

    return next.handle(newRequest);
  }

}
