import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModelDTO } from '../modelDto/user-model-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserInfoUrl = "http://localhost:8088/school/api/user/get/";

  constructor(
    private http: HttpClient,
  ) { }

  getUserInfo(id: number) {
    return this.http.get<UserModelDTO>(this.getUserInfoUrl + id);
  }
}
