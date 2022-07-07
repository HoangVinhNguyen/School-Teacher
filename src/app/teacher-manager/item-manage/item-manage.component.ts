import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html',
  styleUrls: ['./item-manage.component.css']
})
export class ItemManageComponent implements OnInit {

  @Input() courseName = "";
  @Input() link = "";

  constructor() { }

  ngOnInit(): void {
  }

}
