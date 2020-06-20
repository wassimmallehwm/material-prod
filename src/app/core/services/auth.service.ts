import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginResponse, SignupResponse, LogoutResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
const USER_BASE_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(USER_BASE_URL + '/login', body);
  }

  signup(body: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(USER_BASE_URL + '/signup', body);
  }

  // googleAuth(): Observable<LoginResponse> {
  //   return this.http.get<LoginResponse>(BASE_URL + '/auth/google');
  // }

  isAuthenticated(token: any): Observable<boolean> {
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);
    const options = {headers: header};
    return this.http.get<boolean>(BASE_URL + '/auth/authenticate', options);
  }

  logOut(): Observable<LogoutResponse> {
    return this.http.get<LogoutResponse>(BASE_URL + '/auth/logout');
  }


}
