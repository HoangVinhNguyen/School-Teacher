import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class StudentPointBodyReq {
  constructor(
    public student: UserModelDTO,
    public point: number
  ) {}
}

export class SavePointBodyReq {

  constructor(
    public teacher: UserModelDTO,
    public clazz: ClazzModelDTO,
    public course: CourseModelDTO,
    public listStudents: UserModelDTO[]
  ) {}
}
