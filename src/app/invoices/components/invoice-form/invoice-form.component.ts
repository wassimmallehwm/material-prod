import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  form: FormGroup;
  id: string;
  invoice: Invoice;

  constructor(private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.setForm();
  }

  buildForm(){
    this.form = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: '',
      tax: ''
    })
  }

  onSubmit() {
    if (this.invoice) {
      // EDIT
      this.edit();
    } else {
      // CREATE
      this.create();
    }
  }

  private create() {
    this.invoiceService.create(this.form.value).subscribe(
      data => {
        this.form.reset();
        this.snackBar.open('Invoice created !', 'Success', {
          duration: 3000
        });
        this.router.navigate(['dashboard', 'invoices']);
      },
      error => {
        this.errorHandler(error, 'Invoice creation Failed !');
      }
    );
  }

  private edit() {
    this.invoiceService.edit(this.id, this.form.value).subscribe(
      data => {
        this.form.reset();
        this.snackBar.open('Invoice Updated !', 'Success', {
          duration: 3000
        });
        this.router.navigate(['dashboard', 'invoices']);
      },
      error => {
        this.errorHandler(error, 'Invoice edition Failed !');
      }
    );
  }

  private setForm() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        this.invoiceService.getOne(this.id).subscribe(
          data => {
            this.invoice = data;
            this.form.patchValue(this.invoice);
          },
          error => {
            this.errorHandler(error, 'Failed to get Invoice');
          }
        )
      }
    })
  }

  private errorHandler(error, message){
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
