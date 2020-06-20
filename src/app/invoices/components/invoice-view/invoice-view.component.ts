import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/clients/services/clients.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  id: string;
  invoice: Invoice;
  loader = true;
  total: number;

  constructor(
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientsService
  ) { }

  ngOnInit() {
    this.getInvoice();
  }

  private getInvoice() {
    this.loader = true;
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        this.invoiceService.getOne(this.id).subscribe(
          data => {
            this.invoice = data;
            if(typeof this.invoice.qty !== 'undefined' && typeof this.invoice.qty !== 'undefined') {
              this.total = this.invoice.qty * this.invoice.rate;
            }
            let salesTax = 0;
            if(typeof this.invoice.tax !== 'undefined'){
              salesTax = this.total * this.invoice.tax / 100;
              this.total += salesTax;
            }

            this.loader = false;
          },
          error => {
            this.errorHandler(error, 'Failed to get Invoice');
          }
        )
      }
    })
  }

  edit(id){
    this.router.navigate(['dashboard', 'invoices', id]);
  }

  private errorHandler(error, message){
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
