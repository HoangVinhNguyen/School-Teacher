import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class AcademicModelDTO {

  constructor(
    private _student: UserModelDTO,
    private _teacher: UserModelDTO,
    private _course: CourseModelDTO,
    private _clazz: ClazzModelDTO,
    private _point: number
  ) { }

  public get point(): number {
    return this._point;
  }
  public set point(value: number) {
    this._point = value;
  }


  public get clazz(): ClazzModelDTO {
    return this._clazz;
  }
  public set clazz(value: ClazzModelDTO) {
    this._clazz = value;
  }
  public get course(): CourseModelDTO {
    return this._course;
  }
  public set course(value: CourseModelDTO) {
    this._course = value;
  }
  public get teacher(): UserModelDTO {
    return this._teacher;
  }
  public set teacher(value: UserModelDTO) {
    this._teacher = value;
  }
  public get student(): UserModelDTO {
    return this._student;
  }
  public set student(value: UserModelDTO) {
    this._student = value;
  }

}
