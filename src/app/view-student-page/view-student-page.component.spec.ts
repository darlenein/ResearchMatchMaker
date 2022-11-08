import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentPageComponent } from './view-student-page.component';

describe('ViewStudentPageComponent', () => {
  let component: ViewStudentPageComponent;
  let fixture: ComponentFixture<ViewStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
