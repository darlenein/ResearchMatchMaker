import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacultyModel } from '../../models/faculty.model';
import { TopMenuBarComponent } from '../../student-folder/student-top-menu-bar/student-top-menu-bar.component';

import { ViewFacultyPageComponent } from './view-faculty-page.component';

describe('ViewFacultyPageComponent', () => {
  let component: ViewFacultyPageComponent;
  let fixture: ComponentFixture<ViewFacultyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFacultyPageComponent, TopMenuBarComponent],
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFacultyPageComponent);
    component = fixture.componentInstance;

    let f = new FacultyModel();
    component.faculty = f;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
