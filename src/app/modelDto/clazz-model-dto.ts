import { UserModelDTO } from "./user-model-dto";

export class ClazzModelDTO {

  constructor(
    public id: number,
    public name: string,
    public numberOfStudents: number,
    public listStudents: Array<UserModelDTO>,
  ) { }

}
