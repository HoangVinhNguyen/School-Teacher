import { BaseModel } from "./base-model";
import { Topic } from "./topic-model-dto";
import { UserModelDTO } from "./user-model-dto";

export class CommentDTO extends BaseModel {

  constructor(
    public user: UserModelDTO,
    public topic: Topic,
    public content: string,
    public id: number | null,
  ){
    super(id);
  }
}
