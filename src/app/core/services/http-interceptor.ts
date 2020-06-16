import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.jwtService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const headers = {
  //     'Content-Type' : 'application/json',
  //     'Accept' : 'application/json'
  //   };

  //   const token = this.jwtService.getToken();
  //   if(token) {
  //     headers['Authorization'] = 'Bearer ' + this.jwtService.getToken();
  //   }
  //   const _req = req.clone({headers: headers});
  //   return next.handle(_req);
  // }
}
