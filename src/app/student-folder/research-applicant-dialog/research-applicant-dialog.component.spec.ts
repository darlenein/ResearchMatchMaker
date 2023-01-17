import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchApplicantDialogComponent } from './research-applicant-dialog.component';

describe('ResearchApplicantDialogComponent', () => {
  let component: ResearchApplicantDialogComponent;
  let fixture: ComponentFixture<ResearchApplicantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchApplicantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchApplicantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
