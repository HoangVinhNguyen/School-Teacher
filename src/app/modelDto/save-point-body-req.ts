import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class StudentPointBodyReq {
  constructor(
    private student: UserModelDTO,
    private point: number
  ) {}
}

export class SavePointBodyReq {

  constructor(
    private teacher: UserModelDTO,
    private clazz: ClazzModelDTO,
    private course: CourseModelDTO,
    private listStudents: UserModelDTO[]
  ) {}
}
