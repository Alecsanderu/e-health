import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingHttpInterceptor } from './caching.http-interceptor';
import { RequestHeadersHttpInterceptor } from './request-headers.http-interceptor';
import { RequestResponseHttpInterceptor } from './request-response.http-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: CachingHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestHeadersHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestResponseHttpInterceptor, multi: true }
];
