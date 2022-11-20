import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchPageComponent } from './edit-research-page.component';

describe('EditResearchPageComponent', () => {
  let component: EditResearchPageComponent;
  let fixture: ComponentFixture<EditResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
