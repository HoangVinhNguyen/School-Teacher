import { BaseModel } from "./base-model";
import { Topic } from "./topic-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class StudentAndTopicDTO extends BaseModel{

  constructor(
    public student: UserModelDTO,
    public topic: Topic,
    public content: string,
    public id: number | null,
  ) {
    super(id);
  }
}
