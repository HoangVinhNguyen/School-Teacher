import { Component, Input, OnInit } from '@angular/core';
import { AcademicModelDTO } from 'src/app/modelDto/academic-model-dto';
import { Point } from 'src/app/modelDto/point-model';
import { Topic } from 'src/app/modelDto/topic-model-dto';
import { StudentManagerService } from '../student-manager.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() courseInfo!: AcademicModelDTO;
  console = console;

  constructor(
    private _studentService: StudentManagerService,
  ) { }

  ngOnInit(): void {
    this.getTopic(this.courseInfo.course.id, this.courseInfo.clazz.id);
  }

  public getAverage(listPoint: Point[]): number {
    let sum = listPoint.reduce((sum, p) => sum + (p.point * p.coefficient), 0);
    let count = listPoint.reduce((sum, p) => sum + p.coefficient, 0);
    let result = sum / count;
    return Number(result.toFixed(2));
  }

  getTopic(idCourse: number, isClass: number) {
    this._studentService.getTopic(idCourse, isClass).subscribe(
      data => {

      }
    );
  }
}
