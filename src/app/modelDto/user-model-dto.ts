import { Point } from "./point-model";

export class UserModelDTO {
  constructor(
    public id: number | null,
    public firstName: string | null,
    public lastName: string | null,
    public fullName: string | null,
    public email: string | null,
    public phone: string | null,
    public dob: Date | null,
    public address: string | null,
    public photos: string | null,
    public listPoint: Point[] | null
  ) {
    if (firstName && lastName) {
      fullName = firstName + lastName;
    }
  }

}
