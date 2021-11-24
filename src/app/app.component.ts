import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'School Teacher Manager';
  roles!: string[];
  authority!: string;

  constructor(
    private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_TEACHER') {
          this.authority = 'teacher';
          return true;
        }
        return false;
      });
    }
  }
}
