import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/modelDto/topic-model-dto';

@Component({
  selector: 'app-item-detail-course',
  templateUrl: './item-detail-course.component.html',
  styleUrls: ['./item-detail-course.component.css']
})
export class ItemDetailCourseComponent implements OnInit {

  @Input() topic!: Topic;
  @Input() srcImg: string = "";

  private _selectedFile = "";
  private _nameTopic = "";

  constructor() { }

  ngOnInit(): void {

  }

  public get nameTopic() {
    return this._nameTopic;
  }
  public set nameTopic(value) {
    this._nameTopic = value;
  }
  public get selectedFile() {
    return this._selectedFile;
  }
  public set selectedFile(value) {
    this._selectedFile = value;
  }

  onFileChanged(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.selectedFile = reader.result as string;
      reader.readAsDataURL(file);
      this.nameTopic = event.target.files[0].name;
    }
  }

}
