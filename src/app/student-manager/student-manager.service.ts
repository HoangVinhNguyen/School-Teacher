import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { CommentDTO } from '../modelDto/comment-dto';
import { StudentAndTopicDTO } from '../modelDto/student-and-topic';
import { Topic } from '../modelDto/topic-model-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentManagerService {

  private getAcademicTranscriptUrl = "http://localhost:8088/school/api/student/academic-transcript/";
  private getTestUrl = "http://localhost:8088/school/api/student/topic/course/{idCourse}/class/{isClass}";
  private getTopicFullUrl = "http://localhost:8088/school/api/student/topic/course/{idCourse}/class/{isClass}/full";
  private postCommentUrl = "http://localhost:8088/school/api/student/topic/comment";
  private getCommentUrl = "http://localhost:8088/school/api/student/topic/comment/";
  private postAnswerUrl = "http://localhost:8088/school/api/student/topic/answer";
  private getAnswerUrl = "http://localhost:8088/school/api/student/topic/answer/student/{idStudent}/topic/{idTopic}";

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

  getTopic(idCourse: number, isClass: number): Observable<any> {
    return this.http.get<Topic[]>(this.getTestUrl.replace("{idCourse}", idCourse.toString())
    .replace("{isClass}", isClass.toString()));
  }
  getTopicFull(idCourse: number, isClass: number): Observable<any> {
    return this.http.get<Topic[]>(this.getTopicFullUrl.replace("{idCourse}", idCourse.toString())
    .replace("{isClass}", isClass.toString()));
  }

  postAnswer(body: StudentAndTopicDTO): Observable<any> {
    return this.http.post<StudentAndTopicDTO>(this.postAnswerUrl, body);
  }
  getAnswer(idStudent: number, idTopic: number): Observable<any> {
    return this.http.get<Topic[]>(this.getAnswerUrl.replace("{idStudent}", idStudent.toString())
    .replace("{idTopic}", idTopic.toString()));
  }

  postComment(body: CommentDTO): Observable<any> {
    return this.http.post<CommentDTO[]>(this.postCommentUrl, body);
  }
  getComment(id: number ): Observable<any> {
    return this.http.get<CommentDTO>(this.getCommentUrl + id);
  }
}
