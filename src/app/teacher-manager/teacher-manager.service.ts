import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { AcademicBodyReq } from '../modelDto/academic-body-req';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { ClazzModelDTO } from '../modelDto/clazz-model-dto';
import { CourseModelDTO } from '../modelDto/course-model-dto';
import { SavePointBodyReq } from '../modelDto/save-point-body-req';
import { UserModelDTO } from '../modelDto/user-model-dto';


@Injectable({
  providedIn: 'root'
})
export class TeacherManagerService {

  private getClassesUrl = "http://localhost:8088/school/api/teacher/classes";
  private getCourseUrl = "http://localhost:8088/school/api/teacher/courses";
  private getAcademicUrl = "http://localhost:8088/school/api/teacher/academic-transcript";
  private getProfileUrl = "http://localhost:8088/school/api/teacher/profile/";
  private savePointUrl = "http://localhost:8088/school/api/teacher/save-point";

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  }

  getClasses(): Observable<any> {
    return this.http.get<ClazzModelDTO[]>(this.getClassesUrl);
  }

  getCourses(): Observable<any> {
    return this.http.get<CourseModelDTO[]>(this.getCourseUrl);
  }

  getAcademic(academicBody: AcademicBodyReq ): Observable<any> {
    return this.http.post<AcademicModelDTO[]>(this.getAcademicUrl, academicBody);
  }

  getProfile(id: number): Observable<any>{
    return this.http.get<UserModelDTO>(this.getProfileUrl + id);
  }

  getTeacherId(): number {
    return this.tokenStorageService.getUserId();
  }

  savePoint(savePointBody: SavePointBodyReq): Observable<any> {
    return this.http.post<SavePointBodyReq>(this.savePointUrl, savePointBody);
  }

}
