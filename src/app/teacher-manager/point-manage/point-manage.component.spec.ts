import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointManageComponent } from './point-manage.component';

describe('PointManageComponent', () => {
  let component: PointManageComponent;
  let fixture: ComponentFixture<PointManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
