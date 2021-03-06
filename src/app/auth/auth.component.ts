import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { environment } from 'src/environments/environment';
import { User } from '../core/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  title = '';
  loader = false;
  fbLoginUrl = environment.apiUrl + '/auth/facebook';
  googleLoginUrl = environment.apiUrl + '/auth/google';

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService) { }

  ngOnInit() {
    this.buildForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', Validators.required],
      name: '',
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loader = true;
    if(this.title === 'Login'){
      this.login();
    } else {
      this.signup();
    }
  }

  private login() {
    const user = new User();
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    this.authService.login(user).subscribe(
      data => {
        this.jwtService.setToken(data.token);
        this.router.navigate(['dashboard', 'invoices']);
      },
      error => {
        this.errorHandler(error, 'Login Failed !');
      }
    );
  }

  private signup() {
    this.authService.signup(this.form.value).subscribe(
      data => {
        this.snackBar.open(data.message, 'Success', {
          duration: 3000
        });
        this.router.navigate(['login']);
      },
      error => {
        if(error.status == 400){
          this.errorHandler(error, error.error.message);
        } else {
          this.errorHandler(error, 'Signup Failed !');
        }
      }
    );
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

  private errorHandler(error, message){
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
