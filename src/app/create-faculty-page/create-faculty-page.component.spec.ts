import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacultyPageComponent } from './create-faculty-page.component';

describe('CreateFacultyPageComponent', () => {
  let component: CreateFacultyPageComponent;
  let fixture: ComponentFixture<CreateFacultyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFacultyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFacultyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
