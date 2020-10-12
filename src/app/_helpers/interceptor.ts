import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem('token');
    let reClone;
    if (token) {
      reClone = request.clone({
        //withCredentials: true,
       // 'Access-Control-Expose-Headers' : 'Authorization'
        setHeaders:  {
          'Access-Control-Expose-Headers' : 'Authorization',
       
          'Accept':  'application/json, text/plain, */*',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Authorization': 'Bearer ' + token

        }
      });

      return next.handle(reClone);
    }
    return next.handle(request);
  }
}
