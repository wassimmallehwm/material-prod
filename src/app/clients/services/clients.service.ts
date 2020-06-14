import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';


const BASE_URL = environment.apiUrl + '/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  create(body: Client): Observable<Client> {
    return this.http.post<Client>(BASE_URL, body);
  }

  getClients(): Observable<Client[]> {
    // let url = BASE_URL + '?page=' + ++page + '&perPage=' + perPage;
    // if (sortField && sortDir) {
    //   url = url + '&sortField=' + sortField + '&sortDir=' + sortDir;
    // }
    // if (filter) {
    //   url = url + '&filter=' + filter;
    // }
    return this.http.get<Client[]>(BASE_URL);
  }

  getOne(id: string): Observable<Client> {
    return this.http.get<Client>(BASE_URL + '/' + id);
  }

  edit(id: string, body: Client): Observable<Client> {
    return this.http.put<Client>(BASE_URL + '/' + id, body);
  }

  delete(id: string): Observable<Client> {
    return this.http.delete<Client>(BASE_URL + '/' + id);
  }
}
