import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { AcademicBodyReq } from '../modelDto/academic-body-req';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentManagerService {

  private getAcademicTranscriptUrl = "http://localhost:8088/school/api/student/academic-transcript/";

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) { }

  getAcademic(id: number ): Observable<any> {
    return this.http.get<AcademicModelDTO[]>(this.getAcademicTranscriptUrl + id);
  }

  getStudentId(): number {
    return this.tokenStorageService.getUserId();
  }
}
