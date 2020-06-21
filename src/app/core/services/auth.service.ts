import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginResponse, SignupResponse, LogoutResponse, ForgotPasswordResponse } from '../models/user';
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

  isAuthenticated(token: any): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'skip' : 'true',
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    });
    const options = {
      headers : headers
    }
    return this.http.get<boolean>(BASE_URL + '/auth/authenticate', options);
  }

  logOut(): Observable<LogoutResponse> {
    return this.http.get<LogoutResponse>(BASE_URL + '/auth/logout');
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(USER_BASE_URL + '/refresh', null);
  }

  forgotPassword(body): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(USER_BASE_URL + '/forgot-password', body);
  }

  resetPassword(body): Observable<ForgotPasswordResponse> {
    const headers: HttpHeaders = new HttpHeaders({
      'skip' : 'true',
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + body.token
    });
    const options = {
      headers : headers
    }
    return this.http.put<ForgotPasswordResponse>(
      USER_BASE_URL + '/reset-password',
      {password: body.password},
      options
    );
  }


}
