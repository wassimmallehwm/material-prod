import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<void>();

  constructor(private jwtService: JwtService, private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logOut().subscribe(
      data => {
        console.log(data);
        this.jwtService.destroyToken();
        this.router.navigate(['login']);
      },
      error => {
        this.errorHandler(error, 'Logout Failed !');
      }
    );
  }

  private errorHandler(error, message){
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
