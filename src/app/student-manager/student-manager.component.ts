import { Component, OnInit } from '@angular/core';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { UserModelDTO } from '../modelDto/user-model-dto';
import { StudentManagerService } from './student-manager.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {

  listAcademic!: AcademicModelDTO[];
  profile!: UserModelDTO;
  average: number = 0;
  constructor(
    private studentService: StudentManagerService,
  ) { }

  ngOnInit(): void {
    this.getAcademicTranscript();
  }

  getAcademicTranscript() {
    let id = this.studentService.getStudentId();
    this.studentService.getAcademic(id).subscribe(
      data => {
        let countCourse = data.length;
        let averagePoint = 0;
        this.average = data.forEach((e: AcademicModelDTO) => {
          averagePoint += e.point;
        });
        this.average = averagePoint;
        this.average = this.average / countCourse;
        this.listAcademic = data;
        this.profile = data[0].student;
        console.log(this.listAcademic);
      },
      error => {
        console.log(error);
      }
    );
  }
}
