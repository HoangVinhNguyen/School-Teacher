import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from '../message/message-reponse';
import { JwtResponse } from './jwt-response';
import { LoginInfo } from './login-info';
import { LogoutInfo } from './logout-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:8088/school/api/auth/login";
  private logoutUrl = "http://localhost:8088/school/api/auth/logout";

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  logoutAccount(id: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.logoutUrl, new LogoutInfo(id), httpOptions);
  }
}
