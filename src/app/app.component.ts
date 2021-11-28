import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'School Teacher Manager';
  roles!: string[];
  authority!: string;
  @Output() IsLogin = false;
  subscription!: Subscription;

  constructor(
    private tokenStorageService: TokenStorageService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.loginService.subcribeUserId$.subscribe(
      id => this.IsLogin = id !== 0 ? false : true
    );
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_TEACHER') {
          this.authority = 'teacher';
          return true;
        }
        if (role === 'ROLE_STUDENT') {
          this.authority = 'student';
          return true;
        }
        return false;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
