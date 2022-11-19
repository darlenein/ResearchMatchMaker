import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewFacultyPageComponent } from './student-view-faculty-page.component';

describe('StudentViewFacultyPageComponent', () => {
  let component: StudentViewFacultyPageComponent;
  let fixture: ComponentFixture<StudentViewFacultyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewFacultyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViewFacultyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
