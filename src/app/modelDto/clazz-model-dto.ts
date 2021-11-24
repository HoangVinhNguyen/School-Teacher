import { UserModelDTO } from "./user-model-dto";

export class ClazzModelDTO {

  constructor(
    private _id: number,
    private _name: string,
    private _numberOfStudents: number,
    private _listStudents: Array<UserModelDTO>,
  ) { }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get listStudents(): Array<UserModelDTO> {
    return this._listStudents;
  }
  public set listStudents(value: Array<UserModelDTO>) {
    this._listStudents = value;
  }
  public get numberOfStudents(): number {
    return this._numberOfStudents;
  }
  public set numberOfStudents(value: number) {
    this._numberOfStudents = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

}
