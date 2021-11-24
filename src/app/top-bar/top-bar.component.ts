import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorageService.logOut();
    this.router.navigateByUrl("")
  }
}
