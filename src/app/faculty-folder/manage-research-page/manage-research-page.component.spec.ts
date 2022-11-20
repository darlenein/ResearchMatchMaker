import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResearchPageComponent } from './manage-research-page.component';

describe('ManageResearchPageComponent', () => {
  let component: ManageResearchPageComponent;
  let fixture: ComponentFixture<ManageResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
