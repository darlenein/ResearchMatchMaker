import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModel } from '../models/student.model';
import { TopMenuBarComponent } from '../student-top-menu-bar/student-top-menu-bar.component';

import { ViewStudentPageComponent } from './view-student-page.component';

describe('ViewStudentPageComponent', () => {
  let component: ViewStudentPageComponent;
  let fixture: ComponentFixture<ViewStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentPageComponent, TopMenuBarComponent ],
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

    fixture = TestBed.createComponent(ViewStudentPageComponent);
    component = fixture.componentInstance;

    let s = new StudentModel();
    component.student = s;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spilt string by semicolon', () => {
    //arrange
    let text = "hello;hi;bye";
    //act
    let result = component.separateByComma(text);
    //assert
    expect(result.length).toBe(3);
    expect(result.at(0)).toBe("hello");
    expect(result.at(1)).toBe("hi");
    expect(result.at(2)).toBe("bye");
  });

});
