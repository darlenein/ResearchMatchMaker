import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResearchHomepageFacultyComponent } from './view-research-homepage.component';

describe('ViewResearchHomepageFacultyComponent', () => {
  let component: ViewResearchHomepageFacultyComponent;
  let fixture: ComponentFixture<ViewResearchHomepageFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResearchHomepageFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResearchHomepageFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
