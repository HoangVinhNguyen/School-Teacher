import { TestBed } from '@angular/core/testing';

import { TeacherManagerService } from './teacher-manager.service';

describe('TeacherManagerService', () => {
  let service: TeacherManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
