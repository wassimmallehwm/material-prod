import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router){
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.jwtService.getToken()) {
      this.router.navigate(['dashboard', 'invoices']);
      return false;
    }
    return true;
  }
}
