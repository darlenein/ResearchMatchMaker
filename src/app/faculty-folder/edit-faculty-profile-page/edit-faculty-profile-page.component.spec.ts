import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacultyProfilePageComponent } from './edit-faculty-profile-page.component';

describe('EditFacultyProfilePageComponent', () => {
  let component: EditFacultyProfilePageComponent;
  let fixture: ComponentFixture<EditFacultyProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacultyProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacultyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
