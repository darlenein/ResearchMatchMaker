import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyViewStudentPageComponent } from './faculty-view-student-page.component';

describe('FacultyViewStudentPageComponent', () => {
  let component: FacultyViewStudentPageComponent;
  let fixture: ComponentFixture<FacultyViewStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyViewStudentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyViewStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
