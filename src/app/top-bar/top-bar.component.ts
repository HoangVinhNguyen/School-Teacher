import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() isLogin!: boolean;
  @Input() fullName!: string | null;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }
}
