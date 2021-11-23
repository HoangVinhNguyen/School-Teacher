import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'token_key';
const REFRESH_TOKEN_KEY = 'refresh_key'
const EMAIL_KEY = 'email';
const USER_ID_KEY = 'userId';
const ROLES_KEY = 'roles';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];

  constructor(private authService: AuthService) { }

  logOut() {
    this.authService.logoutAccount(this.getUserId()).subscribe(
      data => {
        console.log(data['message']);
      },
      error => {

      }
    );
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY)!;
  }

  public saveRefreshToken(token: string) {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY)!;
  }

  public saveUserId(id: number) {
    window.sessionStorage.removeItem(USER_ID_KEY);
    window.sessionStorage.setItem(USER_ID_KEY, id.toString());
  }

  public getUserId(): number {
    return Number(sessionStorage.getItem(USER_ID_KEY)!);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLES_KEY)!).forEach((authority: { roles: string; }) => {
        this.roles.push(authority.roles);
      });
    }
    return this.roles;
  }

}

