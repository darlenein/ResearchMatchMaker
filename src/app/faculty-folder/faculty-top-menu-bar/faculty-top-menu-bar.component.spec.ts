
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TopMenuBarComponent } from 'src/app/student-folder/student-home-page/student-top-menu-bar/student-top-menu-bar.component';
import { FacultyTopMenuBarComponent } from './faculty-top-menu-bar.component';

describe('FacultyTopMenuBarComponent', () => {
  let component: FacultyTopMenuBarComponent;
  let fixture: ComponentFixture<FacultyTopMenuBarComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyTopMenuBarComponent, TopMenuBarComponent ],
      imports: [

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyTopMenuBarComponent);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
