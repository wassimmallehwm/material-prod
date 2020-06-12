import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { remove } from 'lodash';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  invoices: Invoice[];
  displayedColumns: string[] = ['item', 'qty', 'date', 'due', 'rate', 'tax', 'action'];

  constructor(private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceService.getInvoices().subscribe(result => {
      this.invoices = result;
      console.log(this.invoices);
    }, error => this.errorHandler(error, 'Failed to fetch Invoice !'));
  }

  newInvoice() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }

  edit(id){
    this.router.navigate(['dashboard', 'invoices', id]);
  }

  delete(id){
    this.invoiceService.delete(id).subscribe(
      data => {
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 3000
        });
        const removedItem = remove(this.invoices, (item) => {
          return item._id === data._id;
        });
        this.invoices = [...this.invoices];
      },
      error => {
        this.errorHandler(error, 'Failed to delete Invoice !');
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
