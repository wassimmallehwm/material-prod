import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginResponse, SignupResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(BASE_URL + '/login', body);
  }

  signup(body: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(BASE_URL + '/signup', body);
  }


}
