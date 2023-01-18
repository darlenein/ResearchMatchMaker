import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelResearchDialogComponent } from './cancel-research-dialog.component';

describe('CancelResearchDialogComponent', () => {
  let component: CancelResearchDialogComponent;
  let fixture: ComponentFixture<CancelResearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelResearchDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelResearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
