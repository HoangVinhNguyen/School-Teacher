import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AcademicBodyReq } from '../modelDto/academic-body-req';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { ClazzModelDTO } from '../modelDto/clazz-model-dto';
import { CourseModelDTO } from '../modelDto/course-model-dto';
import { SavePointBodyReq } from '../modelDto/save-point-body-req';
import { UserModelDTO } from '../modelDto/user-model-dto';
import { TeacherManagerService } from './teacher-manager.service';

@Component({
  selector: 'app-teacher-manager',
  templateUrl: './teacher-manager.component.html',
  styleUrls: ['./teacher-manager.component.css']
})
export class TeacherManagerComponent implements OnInit, AfterViewInit {

  listClasses!: ClazzModelDTO[];
  listCourses!: CourseModelDTO[];
  contentClass!: ClazzModelDTO;
  selectedCourse!: CourseModelDTO;
  private profile!: UserModelDTO
  private listAcademic!: AcademicModelDTO[];
  private classIdClicked!: number;

  constructor(
    private teacherManager: TeacherManagerService,
  ) { }

  ngOnInit(): void {
    this.getClasses();
    this.getCourses();
    this.getProfile();
  }

  ngAfterViewInit(): void {

  }

  getDate(date: Date): string {
    return date.getDate().toString();
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

  showClass(classId: number) {
    if (this.listClasses.length > 0 && this.selectedCourse !== null) {
      this.classIdClicked = classId;
      this.contentClass = this.listClasses.find(clazz => clazz.id === classId)!;
      let academicBody = new AcademicBodyReq(this.profile, this.contentClass, this.selectedCourse);
      this.teacherManager.getAcademic(academicBody).subscribe(
        data => {
          this.listAcademic = data;
          this.contentClass.listStudents.forEach(student => {
            this.listAcademic.filter(academic => academic.student.id === student.id)
            .map(academic => student.listPoint = academic.listPoint);
          });
        },
        error => {
          console.log(error);
        }
      );
    }
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
      },
      error => {
        console.log(error);
      }
    );
  }

  selectedCourseChanged(ob: any) {
    if (this.classIdClicked > 0) {
      this.showClass(this.classIdClicked);
    }
  }

  savedPoint() {
    let savePointBody = new SavePointBodyReq(this.profile,
                                              this.contentClass,
                                              this.selectedCourse,
                                              this.contentClass.listStudents);
    this.teacherManager.savePoint(savePointBody).subscribe(
      data => {
        this.listAcademic = data;
        this.contentClass.listStudents.forEach(student => {
          this.listAcademic.filter(academic => academic.student.id === student.id)
          .map(academic => student.listPoint = academic.listPoint);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}
