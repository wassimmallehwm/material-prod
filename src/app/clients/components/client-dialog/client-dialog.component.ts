import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  form: FormGroup;
  id: string;
  client: Client;
  title = 'Create Client';

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private clientService: ClientsService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.buildForm();

    if(this.data){
      this.title = 'Edit Client';
      this.setFormData(this.data);
    }
  }

  setFormData(id){
    this.clientService.getOne(id).subscribe(
      result => {
      this.form.patchValue(result);
      },
      error => {
        this.errorHandler(error, 'Clients loading Failed !');
      }
    );
  }

  buildForm() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private errorHandler(error, message){
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
