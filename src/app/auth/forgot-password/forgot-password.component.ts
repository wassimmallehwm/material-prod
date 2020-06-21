import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  loader = true;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
    this.loader = false;
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loader = true;
    this.authService.forgotPassword(this.form.value).subscribe(
      data => {
        this.snackBar.open(data.message, 'Success', {
          duration: 3000
        });
        this.loader = false;
      },
      error => {
        this.errorHandler(error, 'Email sending Failed !');
      }
    );
  }

  private errorHandler(error, message){
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
