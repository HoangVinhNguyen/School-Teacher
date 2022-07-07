import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subcribeUserId = new BehaviorSubject<number>(0);
  subcribeUserId$ = this.subcribeUserId.asObservable();

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }
  setSubcribeUserId(value: number) {
    this.subcribeUserId.next(value);
  }

  private get getSubcribeUserId():number {
    return this.subcribeUserId.getValue()
  }
  login(loginInfo: LoginInfo) {
    this.authService.attemptAuth(loginInfo).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveRefreshToken(data.refreshToken);
        this.tokenStorageService.saveEmail(data.email);
        this.tokenStorageService.saveUserId(data.id);
        this.tokenStorageService.saveAuthorities(data.roles);
        if (data.roles.includes('ROLE_STUDENT')) {
          this.router.navigateByUrl("student");
        }
        if (data.roles.includes('ROLE_TEACHER')) {
          this.router.navigateByUrl("teacher");
        }
        this.setSubcribeUserId(data.id);
      },
      error => {
        console.log(error);
      }

    );
  }

  logout() {
    this.tokenStorageService.logOut();
    this.setSubcribeUserId(0);
    this.router.navigateByUrl("");
  }
}
