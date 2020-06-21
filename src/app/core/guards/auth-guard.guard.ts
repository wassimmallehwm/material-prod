import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService,
    private router: Router, private authService: AuthService){

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.jwtService.getToken()) {
      return of(true);
    }
    const token = route.queryParamMap.get('token');
    if (token) {
      return this.authService.isAuthenticated(token).pipe(
        map(authenticated => {
          if (authenticated === true) {
            this.jwtService.setToken(token);
            this.router.navigate(['/dashboard', 'invoices']);
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        }),
        catchError((err: any) => {
          console.log(err);
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }

    this.router.navigate(['login']);
    return of(false);
  }
}
