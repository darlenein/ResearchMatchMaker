import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewStudentResearchPageComponent } from './student-view-research-page.component';

describe('ViewStudentResearchPageComponent', () => {
  let component: ViewStudentResearchPageComponent;
  let fixture: ComponentFixture<ViewStudentResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentResearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
