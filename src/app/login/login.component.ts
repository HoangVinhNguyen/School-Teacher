import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginService } from './login.service';

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
    private loginService: LoginService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.loginFormGr.group({
      email: "",
      password: ""
    });
  }

  onSubmit(): void {
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];
    this.loginInfo = new LoginInfo(email, password);
    this.loginService.login(this.loginInfo);
  }

}
