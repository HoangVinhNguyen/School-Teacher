import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicBodyStudentReq } from 'src/app/modelDto/academic-body-sudent-req';
import { AcademicModelDTO } from 'src/app/modelDto/academic-model-dto';
import { ClazzModelDTO } from 'src/app/modelDto/clazz-model-dto';
import { CommentDTO } from 'src/app/modelDto/comment-dto';
import { Point } from 'src/app/modelDto/point-model';
import { StudentAndTopicDTO } from 'src/app/modelDto/student-and-topic';
import { Topic } from 'src/app/modelDto/topic-model-dto';
import { UserModelDTO } from 'src/app/modelDto/user-model-dto';
import { TeacherManagerService } from '../../teacher-manager.service';

@Component({
  selector: 'app-detail-topic',
  templateUrl: './detail-topic.component.html',
  styleUrls: ['./detail-topic.component.css']
})
export class DetailTopicComponent implements OnInit {

  topic!: Topic;
  topicId!: number;
  listStudents!: Array<UserModelDTO>;
  answerTopic!: StudentAndTopicDTO;
  srcImgArray: string[] = [];
  point!: number;
  isGetAnswer = false;
  isNotAnswer = false;
  JSON = JSON;
  listComment: CommentDTO[] = [];
  comment = "";
  private student!: UserModelDTO;

  constructor(
    private teacherService: TeacherManagerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.topicId = Number(this.route.snapshot.paramMap.get("topicId"));
    this.teacherService.getTopicById(this.topicId).subscribe(
      data => {
        if (data != null) {
          this.topic = data;
          this.getListStudentInClass(this.topic.clazz.id);
        }
      }
    );
    this.getAllComment();
  }
  getUserId(): number {
    return Number(this.teacherService.getStudentId());
  }

  getListStudentInClass(classId: number): void {
    this.teacherService.getClassesById(classId).subscribe(
      data => {
        if (data != null) {
          this.listStudents = data.listStudents;
        }
      }
    );
  }

  openDetail(student: UserModelDTO): void {
    if (student.id) {
      this.getAnswerTopic(student.id);
    }
  }
  getAnswerTopic(studentId: number) {
    if (this.topic.id) {
      this.teacherService.getAnswer(studentId, this.topic.id).subscribe(
        data => {
          if (data != null) {
            this.answerTopic = data;
            if (this.answerTopic.id != null) {
              this.srcImgArray = JSON.parse(this.answerTopic.content);
              this.isGetAnswer = true;
              this.isNotAnswer = false;
              this.student = this.answerTopic.student;
              if (this.topic.id) {
                this.checkPointExisting(studentId, this.topic.id);
              }
            }
            else {
              this.srcImgArray = [];
              this.isGetAnswer = false;
              this.isNotAnswer = true;
            }
          }
        }
      );
    }
  }

  savePoint(): void {
    let academic = new AcademicBodyStudentReq(this.student,
      this.topic.teacher, this.topic.course,
      this.topic.clazz, this.topic,
      Number(this.topic.coefficient),
      Number(this.point), null);

    this.teacherService.savePointStudent(academic).subscribe(
      data => {
        if (data != null) {
          this.point = data.point;
        }
      }
    );
  }

  checkPointExisting(studentId: number, topicId: number) {
    this.teacherService.getPointExisting(studentId, topicId).subscribe(
      data => {
        if (data != null) {
          this.point = data.point;
        }
      }
    );

  }

  upComment() {
    let comment = new CommentDTO(
      new UserModelDTO(this.teacherService.getStudentId(), null, null, null, null, null, null, null, null, null),
      this.topic,
      this.comment,
      null
    );
    this.teacherService.postComment(comment).subscribe(
      data => {
        this.getAllComment();
      }
    );
  }

  getAllComment(): void {
    if (this.topicId) {
      this.teacherService.getComment(this.topicId).subscribe(
        data => {
          this.listComment = data;
        }
      );
    }
  }

}
