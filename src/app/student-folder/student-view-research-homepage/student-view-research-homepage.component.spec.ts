import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResearchHomepageStudentComponent } from './student-view-research-homepage.component';

describe('ViewResearchHomepageStudentComponent', () => {
  let component: ViewResearchHomepageStudentComponent;
  let fixture: ComponentFixture<ViewResearchHomepageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResearchHomepageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResearchHomepageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
