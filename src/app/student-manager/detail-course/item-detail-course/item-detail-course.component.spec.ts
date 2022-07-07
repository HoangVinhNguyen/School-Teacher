import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailCourseComponent } from './item-detail-course.component';

describe('ItemDetailCourseComponent', () => {
  let component: ItemDetailCourseComponent;
  let fixture: ComponentFixture<ItemDetailCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
