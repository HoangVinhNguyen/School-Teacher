import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class AcademicBodyReq {

  constructor(
    private teacher: UserModelDTO,
    private clazz: ClazzModelDTO,
    private course: CourseModelDTO
  ) { }

}
