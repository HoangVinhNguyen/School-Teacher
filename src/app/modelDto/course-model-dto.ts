export class CourseModelDTO {
  constructor(
    private _id: number | null,
    private _name: string | null
  ) { }

  public get name(): string | null {
    return this._name;
  }
  public set name(value: string | null) {
    this._name = value;
  }
  public get id(): number | null {
    return this._id;
  }
  public set id(value: number | null) {
    this._id = value;
  }

}
