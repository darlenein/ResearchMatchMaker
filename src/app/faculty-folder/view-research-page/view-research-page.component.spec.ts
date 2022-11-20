import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResearchPageComponent } from './view-research-page.component';

describe('ViewResearchPageComponent', () => {
  let component: ViewResearchPageComponent;
  let fixture: ComponentFixture<ViewResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
