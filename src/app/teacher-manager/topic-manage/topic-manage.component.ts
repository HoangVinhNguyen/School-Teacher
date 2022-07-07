import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ClazzModelDTO } from 'src/app/modelDto/clazz-model-dto';
import { CourseModelDTO } from 'src/app/modelDto/course-model-dto';
import { Topic } from 'src/app/modelDto/topic-model-dto';
import { UserModelDTO } from 'src/app/modelDto/user-model-dto';
import { TeacherManagerService } from '../teacher-manager.service';

@Component({
  selector: 'app-topic-manage',
  templateUrl: './topic-manage.component.html',
  styleUrls: ['./topic-manage.component.css']
})
export class TopicManageComponent implements OnInit {

  private _numberAnswer = 0;
  private _codeTopic = "";
  private _rowAnswer: number[] = [];
  private _countTopicCol = 0;
  private _colTopic = new Array<number>(Number(this._countTopicCol));
  private _answerList: object[] = [];
  private _profile!: UserModelDTO;
  private _listTestOfTeacher: Topic[] = [];
  selectedCourse!: CourseModelDTO;
  selectedClass!: ClazzModelDTO;
  listClasses!: ClazzModelDTO[];
  listCourses!: CourseModelDTO[];
  coefficient = 1;

  constructor(
    private teacherManager: TeacherManagerService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.getClasses();
    this.getCourses();
    this.getProfile();
  }

  public get listTestOfTeacher(): Topic[] {
    return this._listTestOfTeacher;
  }
  public set listTestOfTeacher(value: Topic[]) {
    this._listTestOfTeacher = value;
  }
  public get profile(): UserModelDTO {
    return this._profile;
  }
  public set profile(value: UserModelDTO) {
    this._profile = value;
  }
  public get codeTopic() {
    return this._codeTopic;
  }
  public set codeTopic(value) {
    this._codeTopic = value;
  }
  public get answerList(): object[] {
    return this._answerList;
  }
  public set answerList(value: object[]) {
    this._answerList = value;
  }
  public get colTopic(): number[] {
    return this._colTopic;
  }
  public set colTopic(value: number[]) {
    this._colTopic = value;
  }
  public get countTopicCol() {
    return this._countTopicCol;
  }
  public set countTopicCol(value) {
    this._countTopicCol = value;
  }
  public get rowAnswer(): number[] {
    return this._rowAnswer;
  }
  public set rowAnswer(value: number[]) {
    this._rowAnswer = value;
  }
  public get numberAnswer() {
    return this._numberAnswer;
  }
  public set numberAnswer(value: number) {
    this._numberAnswer = value;
  }

  getClasses() {
    this.teacherManager.getClasses().subscribe(
      data => {
        this.listClasses = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getCourses() {
    this.teacherManager.getCourses().subscribe(
      data => {
        this.listCourses = data;
        this.selectedCourse = this.listCourses[0];
      },
      error => {
        console.log(error);
      }
    );
  }
  getProfile() {
    let teacher = this.teacherManager.getTeacherId();
    this.teacherManager.getProfile(teacher).subscribe(
      data => {
        this.profile = data;
        if (this.profile.id){
          this.getTestByTeacherId(this.profile.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getTestByTeacherId(idTeacher: number): void {
    this.teacherManager.getTestByTeacherId(idTeacher).subscribe(
      data => {
        this.listTestOfTeacher = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  createAnswer(): void {
    this.rowAnswer = new Array<number>(Number(this._numberAnswer));
  }

  createNewImageTopic(): void {
    this.countTopicCol = this.countTopicCol + 1;
    this.colTopic.push(this.countTopicCol);
  }
  removeTopic(index: number): void {
    this.countTopicCol = this.countTopicCol - 1;
    const eleParent = document.getElementById("list-topic");
    const ele = document.getElementById(index.toString());
    if (ele) {
      eleParent?.removeChild(ele);
    }
  }

  submitTest(): void {
    let stringImgTopic: string[] = [];
    const eleParent = document.getElementById("list-topic")?.getElementsByClassName("imgBox");
    if (eleParent) {
      for (let ele of Array.from(eleParent)) {
        let src = ele.getAttribute("src");
        if (src) {
          stringImgTopic.push(src);
        }
      }
    }

    // let arrayTemp = new Array<number>(Number(this.numberAnswer));
    // this.answerList = [];
    // for (let ind = 0; ind < arrayTemp.length; ind++) {
    //   let a = document.getElementById(`answer${Number(ind) + 1}A`) as HTMLInputElement;
    //   if (a.checked) {
    //     this.answerList.push({ "key": Number(ind) + 1, "value": "A" });
    //   }
    //   let b = document.getElementById(`answer${Number(ind) + 1}B`) as HTMLInputElement;
    //   if (b.checked) {
    //     this.answerList.push({ "key": Number(ind) + 1, "value": "B" });
    //   }
    //   let c = document.getElementById(`answer${Number(ind) + 1}C`) as HTMLInputElement;
    //   if (c.checked) {
    //     this.answerList.push({ "key": Number(ind) + 1, "value": "C" });
    //   }
    //   let d = document.getElementById(`answer${Number(ind) + 1}D`) as HTMLInputElement;
    //   if (d.checked) {
    //     this.answerList.push({ "key": Number(ind) + 1, "value": "D" });
    //   }
    //   let e = document.getElementById(`answer${Number(ind) + 1}E`) as HTMLInputElement;
    //   if (e.checked) {
    //     this.answerList.push({ "key": Number(ind) + 1, "value": "E" });
    //   }
    // }

    // JSON.stringify(this.answerList),
    let saveTest = new Topic(
      this._codeTopic,
      JSON.stringify(stringImgTopic),
      this.selectedClass,
      this.selectedCourse,
      this.profile,
      this.coefficient,
      null
    );
    this.teacherManager.saveTest(saveTest).subscribe(
      data => {
        if (this.profile.id){
          this.getTestByTeacherId(this.profile.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
