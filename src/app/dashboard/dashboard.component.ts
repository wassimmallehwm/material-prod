import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-side-nav></app-side-nav>

  `,
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  interval: any;

  constructor(private authService: AuthService, private jwtService: JwtService) { }

  ngOnInit(){
    this.refreshToken();
  }

  refreshToken() {
    this.interval = setInterval(() => {
      this.authService.refreshToken().subscribe(
        data => {
          this.jwtService.setToken(data.token);
        }
      );
    }, 60000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

}
