import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private loginInfo!: LoginInfo;

  constructor(
    private loginFormGr: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.loginFormGr.group({
      email: "gv2@gmail.com",
      password: "12345678"
    });
  }

  onSubmit(): void {
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];
    this.loginInfo = new LoginInfo(email, password);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveEmail(data.email);
        this.tokenStorage.saveUserId(data.id);
        this.tokenStorage.saveAuthorities(data.roles);
        this.router.navigateByUrl("manager");
      },
      error => {
        console.log(error);
      }

    );
  }

}
