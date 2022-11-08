import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacultyPageComponent } from './view-faculty-page.component';

describe('ViewFacultyPageComponent', () => {
  let component: ViewFacultyPageComponent;
  let fixture: ComponentFixture<ViewFacultyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFacultyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFacultyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
