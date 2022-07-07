import { BaseModel } from "./base-model";
import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { Topic } from "./topic-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class AcademicBodyStudentReq extends BaseModel{

  constructor(
    public student: UserModelDTO,
    public teacher: UserModelDTO,
    public course: CourseModelDTO,
    public clazz: ClazzModelDTO,
    public topic: Topic,
    public coefficient: number,
    public point: number,
    id: number | null,
  ) { super(id) }

}
