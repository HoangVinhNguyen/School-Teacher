import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private urlGetClasses = 'localhost:8088/school/api/teacher/classes';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<string> {
    return this.http.get(this.urlGetClasses, {responseType: 'text'});
  }
}
