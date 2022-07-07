import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { AcademicBodyReq } from '../modelDto/academic-body-req';
import { AcademicBodyStudentReq } from '../modelDto/academic-body-sudent-req';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { ClazzModelDTO } from '../modelDto/clazz-model-dto';
import { CommentDTO } from '../modelDto/comment-dto';
import { CourseModelDTO } from '../modelDto/course-model-dto';
import { SavePointBodyReq } from '../modelDto/save-point-body-req';
import { StudentAndTopicDTO } from '../modelDto/student-and-topic';
import { Topic } from '../modelDto/topic-model-dto';
import { UserModelDTO } from '../modelDto/user-model-dto';


@Injectable({
  providedIn: 'root'
})
export class TeacherManagerService {

  private getClassesUrl = "http://localhost:8088/school/api/teacher/classes";
  private getClassesByIdUrl = "http://localhost:8088/school/api/teacher/classes/";
  private getCourseUrl = "http://localhost:8088/school/api/teacher/courses";
  private getAcademicUrl = "http://localhost:8088/school/api/teacher/academic-transcript";
  private getProfileUrl = "http://localhost:8088/school/api/teacher/profile/";
  private savePointUrl = "http://localhost:8088/school/api/teacher/save-point";
  private savePointStudentUrl = "http://localhost:8088/school/api/teacher/save-point/student";
  private saveTestUrl = "http://localhost:8088/school/api/teacher/save-topic";
  private getTestByIdTeacherUrl = "http://localhost:8088/school/api/teacher/topic/teacher/";
  private getTopicByIdUrl = "http://localhost:8088/school/api/teacher/topic/";
  private getAnswerUrl = "http://localhost:8088/school/api/teacher/topic/answer/student/{idStudent}/topic/{idTopic}";
  private getPointExistingUrl = "http://localhost:8088/school/api/teacher/academic-transcript/student/{idStudent}/topic/{idTopic}";
  private postCommentUrl = "http://localhost:8088/school/api/teacher/topic/comment";
  private getCommentUrl = "http://localhost:8088/school/api/teacher/topic/comment/";

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  }

  getStudentId(): number {
    return this.tokenStorageService.getUserId();
  }

  getClasses(): Observable<any> {
    return this.http.get<ClazzModelDTO[]>(this.getClassesUrl);
  }
  getClassesById(classId: number): Observable<any> {
    return this.http.get<ClazzModelDTO>(this.getClassesByIdUrl + classId);
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

  saveTest(saveTestBody: Topic): Observable<any> {
    return this.http.post<Topic>(this.saveTestUrl, saveTestBody);
  }
  getTestByTeacherId(idTeacher: number): Observable<any> {
    return this.http.get<Topic[]>(this.getTestByIdTeacherUrl + idTeacher);
  }
  getTopicById(topicId: number): Observable<any> {
    return this.http.get<Topic>(this.getTopicByIdUrl + topicId);
  }

  getAnswer(idStudent: number, idTopic: number): Observable<any> {
    return this.http.get<StudentAndTopicDTO>(this.getAnswerUrl.replace("{idStudent}", idStudent.toString())
                                .replace("{idTopic}", idTopic.toString()));
  }

  getPointExisting(idStudent: number, idTopic: number): Observable<any> {
    return this.http.get<AcademicBodyStudentReq>(this.getPointExistingUrl.replace("{idStudent}", idStudent.toString())
                                .replace("{idTopic}", idTopic.toString()));
  }

  savePointStudent(savePointBody: AcademicBodyStudentReq): Observable<any> {
    return this.http.post<AcademicBodyStudentReq>(this.savePointStudentUrl, savePointBody);
  }

  postComment(body: CommentDTO): Observable<any> {
    return this.http.post<CommentDTO[]>(this.postCommentUrl, body);
  }
  getComment(id: number ): Observable<any> {
    return this.http.get<CommentDTO>(this.getCommentUrl + id);
  }
}
