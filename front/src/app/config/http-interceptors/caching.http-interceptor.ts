import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {RequestCacheService} from '../services/request-cache.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class CachingHttpInterceptor implements HttpInterceptor {

  constructor(private readonly cache: RequestCacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isCacheable(req)) {
      this.cache.invalidate();
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    return cachedResponse
           ? of(cachedResponse)
           : this.sendRequest(req, next, this.cache);

  }

  private sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<any>> | Observable<HttpResponse<any>> {
    return next.handle(req)
               .pipe(
                 tap(event => {
                   // There may be other events besides the response.
                   if (event instanceof HttpResponse) {
                     cache.put(req, event); // Update the cache.
                   }
                 })
               );
  }

  private isCacheable(req: HttpRequest<any>): boolean {
    return req.method === 'GET';
  }

}
