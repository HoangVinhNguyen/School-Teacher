import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentDTO } from 'src/app/modelDto/comment-dto';
import { StudentAndTopicDTO } from 'src/app/modelDto/student-and-topic';
import { Topic } from 'src/app/modelDto/topic-model-dto';
import { UserModelDTO } from 'src/app/modelDto/user-model-dto';
import { StudentManagerService } from '../student-manager.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.css']
})
export class DetailCourseComponent implements OnInit {

  listTestOfTeacher: Topic[] = [];
  listComment: CommentDTO[] = [];
  courseId!: number;
  classId!: number;
  topic!: Topic;
  answerTopic!: Topic;
  countTopicCol = 0;
  colTopic = new Array<number>(Number(this.countTopicCol));
  comment = "";
  isSubmit = false;
  srcImgArray: string[] = [];
  JSON = JSON;

  constructor(
    private _studentService: StudentManagerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get("courseId"));
    this.classId = Number(this.route.snapshot.paramMap.get("classId"));
    this.getTopicFull(this.courseId, this.classId);
  }

  getUserId(): number {
    return Number(this._studentService.getStudentId());
  }

  getTopicFull(idCourse: number, isClass: number) {
    this._studentService.getTopicFull(idCourse, isClass).subscribe(
      data => {
        if (data != null) {
          this.listTestOfTeacher = data;
        }
      }
    );
  }
  getAnswerTopic() {
    if (this.topic.id) {
      this._studentService.getAnswer(this._studentService.getStudentId(), this.topic.id).subscribe(
        data => {
          if (data != null) {
            this.answerTopic = data;
            if (this.answerTopic.id != null) {
              let buttonAddImg = document.getElementById("answer-topic-image-btn") as HTMLButtonElement;
              buttonAddImg.setAttribute("disabled", "true");
              let buttonSubmit = document.getElementById("submit-answer-topic-image-btn") as HTMLButtonElement;
              buttonSubmit.setAttribute("disabled", "true");
              this.srcImgArray = JSON.parse(this.answerTopic.content);
              this.isSubmit = true;
            }
          }
        }
      );
    }
  }

  openDetail(selectTopic: Topic): void {
    this.topic = selectTopic;
    this.getAnswerTopic();
    this.getAllComment();
  }
  createNewImageTopic(): void {
    this.countTopicCol = this.countTopicCol + 1;
    this.colTopic.push(this.countTopicCol);
  }
  removeTopic(index: number): void {
    this.countTopicCol = this.countTopicCol - 1;
    const eleParent = document.getElementById("list-topic-answer");
    const ele = document.getElementById(index.toString());
    if (ele) {
      eleParent?.removeChild(ele);
    }
  }

  sendAnswer() {
    let stringImgTopic: string[] = [];
    const eleParent = document.getElementById("list-topic-answer")?.getElementsByClassName("imgBox");
    if (eleParent) {
      for (let ele of Array.from(eleParent)) {
        let src = ele.getAttribute("src");
        if (src) {
          stringImgTopic.push(src);
        }
      }
    }
    let body = new StudentAndTopicDTO(
                    new UserModelDTO(this._studentService.getStudentId(), null, null, null, null, null, null, null, null, null),
                    this.topic,
                    JSON.stringify(stringImgTopic),
                    null
                    );
    this._studentService.postAnswer(body).subscribe(
      data => {
        if (data != null) {
          this.answerTopic = data;
          if (this.answerTopic.id != null) {
            let buttonAddImg = document.getElementById("answer-topic-image-btn") as HTMLButtonElement;
            buttonAddImg.setAttribute("disabled", "true");
            let buttonSubmit = document.getElementById("submit-answer-topic-image-btn") as HTMLButtonElement;
            buttonSubmit.setAttribute("disabled", "true");
            this.srcImgArray = JSON.parse(this.answerTopic.content);
            this.isSubmit = true;
          }
        }
      }
    );
  }

  upComment() {
    let comment = new CommentDTO(
      new UserModelDTO(this._studentService.getStudentId(), null, null, null, null, null, null, null, null, null),
      this.topic,
      this.comment,
      null
    );
    this._studentService.postComment(comment).subscribe(
      data => {
        this.getAllComment();
      }
    );
  }

  getAllComment(): void {
    if (this.topic.id) {
      this._studentService.getComment(this.topic.id).subscribe(
        data => {
          this.listComment = data;
        }
      );
    }
  }

}
