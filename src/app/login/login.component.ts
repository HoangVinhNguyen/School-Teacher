import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
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

  constructor(private loginFormGr: FormBuilder, private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

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
    console.log(this.loginInfo);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveEmail(data.email);
        // this.tokenStorage.saveAuthorities(data.roles);
        console.log(data);
      },
      error => {
        console.log(error);

      }

    );
  }

}
