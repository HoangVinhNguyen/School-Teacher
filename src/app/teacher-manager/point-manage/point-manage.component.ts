import { Component, OnInit } from '@angular/core';
import { AcademicBodyReq } from 'src/app/modelDto/academic-body-req';
import { AcademicModelDTO } from 'src/app/modelDto/academic-model-dto';
import { ClazzModelDTO } from 'src/app/modelDto/clazz-model-dto';
import { CourseModelDTO } from 'src/app/modelDto/course-model-dto';
import { Point } from 'src/app/modelDto/point-model';
import { SavePointBodyReq } from 'src/app/modelDto/save-point-body-req';
import { UserModelDTO } from 'src/app/modelDto/user-model-dto';
import { TeacherManagerService } from '../teacher-manager.service';

@Component({
  selector: 'app-point-manage',
  templateUrl: './point-manage.component.html',
  styleUrls: ['./point-manage.component.css']
})
export class PointManageComponent implements OnInit {

  listClasses!: ClazzModelDTO[];
  listCourses!: CourseModelDTO[];
  contentClass!: ClazzModelDTO;
  selectedCourse!: CourseModelDTO;
  private profile!: UserModelDTO
  listAcademic!: AcademicModelDTO[];
  private classIdClicked!: number;

  constructor(
    private teacherManager: TeacherManagerService,
  ) { }

  ngOnInit(): void {
    this.getClasses();
    this.getCourses();
    this.getProfile();
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
            .map(academic => {
              student.listPoint = academic.listPoint;
            });
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
        this.showClass(this.classIdClicked);

      },
      error => {
        console.log(error);
      }
    );

  }

}
