import { AfterContentInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { LoginService } from './login/login.service';
import { UserModelDTO } from './modelDto/user-model-dto';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {

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
          this.getUserInfo(id);
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

  ngAfterContentInit() {
    if (this.tokenStorageService.getUserId()) {
      this.getUserInfo(this.tokenStorageService.getUserId());
      this.IsLogin = Number(this.tokenStorageService.getUserId()) !== 0 ? false : true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUserInfo(id :number): void {
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
