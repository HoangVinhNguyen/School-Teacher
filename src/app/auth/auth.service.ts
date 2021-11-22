import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { LoginInfo } from './login-info';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Headers': 'Content-Type','Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:8088/school/api/auth/login";

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
}
