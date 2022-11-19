import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyTopMenuBarComponent } from './faculty-top-menu-bar.component';

describe('FacultyTopMenuBarComponent', () => {
  let component: FacultyTopMenuBarComponent;
  let fixture: ComponentFixture<FacultyTopMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyTopMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyTopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
