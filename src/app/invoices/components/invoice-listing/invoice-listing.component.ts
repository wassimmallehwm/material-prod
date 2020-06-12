import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator } from '@angular/material';

import { remove } from 'lodash';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  invoices: Invoice[];
  resultLength: number;
  displayedColumns: string[] = ['item', 'qty', 'date', 'due', 'rate', 'tax', 'action'];
  loader = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.paginator.page.subscribe(data => {
      this.getInvoices(++data.pageIndex, data.pageSize);
    });
    this.getInvoices(1, 10);
  }

  getInvoices(page, perPage) {
    this.loader = true;
    this.invoiceService.getInvoices(page, perPage).subscribe(result => {
      this.invoices = result.docs;
      this.resultLength = result.total;
      this.loader = false;
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
    this.loader = true;
    this.invoiceService.delete(id).subscribe(
      data => {
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 3000
        });
        const removedItem = remove(this.invoices, (item) => {
          return item._id === data._id;
        });
        this.invoices = [...this.invoices];
        this.loader = false;
      },
      error => {
        this.errorHandler(error, 'Failed to delete Invoice !');
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
