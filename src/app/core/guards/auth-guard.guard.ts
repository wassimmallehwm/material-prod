import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService, private router: Router){

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.canActivate();
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.jwtService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
