import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  loader = true;
  private token;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getToken();
    this.loader = false;
  }

  getToken() {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
      }
    });
  }

  buildForm(){
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loader = true;
    const {password, confirmPassword} = this.form.value;
    if(password !== confirmPassword) {
      this.snackBar.open('Passwords must match !', 'Warning', {
        duration: 3000
      });
      return;
    }
    this.authService.resetPassword({password, token: this.token}).subscribe(
      data => {
        this.snackBar.open(data.message, 'Success', {
          duration: 3000
        });
        this.loader = false;
        this.router.navigate(['login']);
      },
      error => {
        this.errorHandler(error, 'Password reset Failed !');
      }
    );
  }

  private errorHandler(error, message) {
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
