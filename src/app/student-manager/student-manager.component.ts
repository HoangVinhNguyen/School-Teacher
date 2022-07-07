import { Component, OnInit } from '@angular/core';
import { AcademicModelDTO } from '../modelDto/academic-model-dto';
import { UserModelDTO } from '../modelDto/user-model-dto';
import { StudentManagerService } from './student-manager.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})

export class StudentManagerComponent implements OnInit {

  private _listAcademic!: AcademicModelDTO[];
  private _profile!: UserModelDTO;

  constructor(
    private _studentService: StudentManagerService,
  ) {
    this.getAcademicTranscript();
  }

  ngOnInit(): void {
  }

  public get listAcademic(): AcademicModelDTO[] {
    return this._listAcademic;
  }
  public set listAcademic(value: AcademicModelDTO[]) {
    this._listAcademic = value;
  }
  public get profile(): UserModelDTO {
    return this._profile;
  }
  public set profile(value: UserModelDTO) {
    this._profile = value;
  }

  async getAcademicTranscriptSync() {
    let id = this._studentService.getStudentId();
    let data = await this._studentService.getAcademic(id).toPromise();
    return data;
  }

  getAcademicTranscript() {
    let id = this._studentService.getStudentId();
    this._studentService.getAcademic(id).subscribe(
      data => {
        this._listAcademic = data;
        this._profile = this._listAcademic[0].student;
      },
      error => {
        console.log(error);
      }
    );
  }
}
