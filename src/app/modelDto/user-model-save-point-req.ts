import { Point } from "./point-model";

export class UserModelSavePointDTO {
  constructor(
    private _id: number | null,
    private _firstName: string | null,
    private _lastName: string | null,
    private _fullName: string | null,
    private _email: string | null,
    private _phone: string | null,
    private _dob: Date | null,
    private _address: string | null,
    private _photos: string | null,
    private _point: number | null
  ) { }

  public get point(): number | null {
    return this._point;
  }
  public set point(value: number | null) {
    this._point = value;
  }
  public get photos(): string | null {
    return this._photos;
  }
  public set photos(value: string | null) {
    this._photos = value;
  }
  public get address(): string | null {
    return this._address;
  }
  public set address(value: string | null) {
    this._address = value;
  }
  public get dob(): Date | null {
    return this._dob;
  }
  public set dob(value: Date | null) {
    this._dob = value;
  }
  public get phone(): string | null {
    return this._phone;
  }
  public set phone(value: string | null) {
    this._phone = value;
  }
  public get email(): string | null {
    return this._email;
  }
  public set email(value: string | null) {
    this._email = value;
  }
  public get fullName(): string | null {
    return this._fullName;
  }
  public set fullName(value: string | null) {
    this._fullName = value;
  }
  public get lastName(): string | null {
    return this._lastName;
  }
  public set lastName(value: string | null) {
    this._lastName = value;
  }
  public get firstName(): string | null {
    return this._firstName;
  }
  public set firstName(value: string | null) {
    this._firstName = value;
  }
  public get id(): number | null {
    return this._id;
  }
  public set id(value: number | null) {
    this._id = value;
  }



}
