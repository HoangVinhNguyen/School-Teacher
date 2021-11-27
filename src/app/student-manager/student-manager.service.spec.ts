import { TestBed } from '@angular/core/testing';

import { StudentManagerService } from './student-manager.service';

describe('StudentManagerService', () => {
  let service: StudentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
