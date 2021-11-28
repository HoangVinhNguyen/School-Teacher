import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { UserModelDTO } from './modelDto/user-model-dto';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'School Teacher Manager';
  private roles!: string[];
  private authority!: string;
  private userInfo!: UserModelDTO;
  private subscription!: Subscription;
  @Output() IsLogin = false;
  @Output() FullName!: string | null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.loginService.subcribeUserId$.subscribe(
      id => {
        this.IsLogin = id !== 0 ? false : true;
        if (this.IsLogin == false) {
          this.userService.getUserInfo(id).subscribe(
            data => {
              this.userInfo = data;
              this.FullName = this.userInfo.fullName;
            }, error => {
              console.log(error);
            }
          );
        }

      }
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
