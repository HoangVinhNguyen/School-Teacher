import { BaseModel } from "./base-model";
import { ClazzModelDTO } from "./clazz-model-dto";
import { CourseModelDTO } from "./course-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class Topic extends BaseModel {

  constructor(
    public code: string = "",
    public content = "",
    public clazz: ClazzModelDTO,
    public course: CourseModelDTO,
    public teacher: UserModelDTO,
    public coefficient: number,
    public id: number | null,
  ) { super(id) }


}
