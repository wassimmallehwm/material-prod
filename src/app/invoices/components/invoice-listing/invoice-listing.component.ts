import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';

import { remove } from 'lodash';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {

  invoices: Invoice[];
  resultLength: number;
  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  loader = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initInvoices();
  }

  ngAfterViewInit(){
    this.paginator.page.subscribe(data => {
      this.getInvoices(null);
    });

    this.sort.sortChange.subscribe(data => {
      this.paginator.pageIndex = 0;
      this.getInvoices(null);
    });
  }

  initInvoices() {
    this.loader = true;
    this.invoiceService.getInvoices(0, 10, null, null, null).subscribe(result => {
      this.invoices = result.docs;
      this.resultLength = result.total;
      this.loader = false;
      console.log(this.invoices);
    }, error => this.errorHandler(error, 'Failed to fetch Invoice !'));
  }

  getInvoices(filter) {
    this.loader = true;
    this.invoiceService.getInvoices(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      filter)
      .subscribe(result => {
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
        this.getInvoices(null);
        // const removedItem = remove(this.invoices, (item) => {
        //   return item._id === data._id;
        // });
        // this.invoices = [...this.invoices];
        // this.loader = false;
      },
      error => {
        this.errorHandler(error, 'Failed to delete Invoice !');
      }
    );
  }

  filterInvoices(filterValue: any){
    this.paginator.pageIndex = 0;
    this.getInvoices(filterValue);
  }

  private errorHandler(error, message){
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
