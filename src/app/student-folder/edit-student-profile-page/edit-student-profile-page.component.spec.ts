import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentProfilePageComponent } from './edit-student-profile-page.component';

describe('EditStudentProfilePageComponent', () => {
  let component: EditStudentProfilePageComponent;
  let fixture: ComponentFixture<EditStudentProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
