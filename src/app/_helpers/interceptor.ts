import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/_services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authenticationService.TokenUsuario
    let reClone;
    if (token) {
      reClone = request.clone({
        setHeaders: {
          Accept:  'application/json, text/plain, */*',
        }
      });

      return next.handle(reClone);
    }
    return next.handle(request);
  }
}