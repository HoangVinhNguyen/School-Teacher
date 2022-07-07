import { BaseModel } from "./base-model";

export class Point extends BaseModel {

  constructor(
    public point: number,
    public coefficient: number,
    public createdDate: Date | null,
    id: number | null,
  ) { super(id) }

}
