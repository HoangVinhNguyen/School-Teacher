import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-topic-image',
  templateUrl: './item-topic-image.component.html',
  styleUrls: ['./item-topic-image.component.css']
})
export class ItemTopicImageComponent implements OnInit {

  private _selectedFile = "";
  private _nameImage = "";

  constructor() { }

  ngOnInit(): void {
  }

  public get nameImage() {
    return this._nameImage;
  }
  public set nameImage(value) {
    this._nameImage = value;
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
      this.nameImage = event.target.files[0].name;
    }
  }

}
