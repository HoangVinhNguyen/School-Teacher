import { BaseModel } from "./base-model";
import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { Point } from "./point-model";
import { Topic } from "./topic-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class AcademicModelDTO extends BaseModel{

  constructor(
    public student: UserModelDTO,
    public teacher: UserModelDTO,
    public course: CourseModelDTO,
    public clazz: ClazzModelDTO,
    public topic: Topic,
    public coefficient: number,
    public listPoint: Point[],
    id: number | null,
  ) { super(id) }

}
