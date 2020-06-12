import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoicePageResponse } from '../models/invoice';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  create(body: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(BASE_URL, body);
  }

  getInvoices(page, perPage): Observable<InvoicePageResponse> {
    return this.http.get<InvoicePageResponse>(BASE_URL + '?page=' + page + '&perPage=' + perPage);
  }

  getOne(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(BASE_URL + '/' + id);
  }

  edit(id: string, body: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(BASE_URL + '/' + id, body);
  }

  delete(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(BASE_URL + '/' + id);
  }
}
