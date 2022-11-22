import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { TopMenuBarComponent } from './student-top-menu-bar.component';
import { routes } from '../../app-routing.module';
import { MatMenuModule } from '@angular/material/menu';

describe('TopMenuBarComponent', () => {
  let component: TopMenuBarComponent;
  let fixture: ComponentFixture<TopMenuBarComponent>;
  let router : Router;
  let location : Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuBarComponent ],
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        RouterTestingModule.withRoutes(routes),
        MatMenuModule
      ]
    })
    .compileComponents();

    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    router.initialNavigation();
    fixture = TestBed.createComponent(TopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('profile link navigates to profile page', fakeAsync(() => {
    router.navigate(['view-student-profile']); 
    tick();
    expect(location.path()).toBe('/view-student-profile');
  }));

  it('profile link navigates to wrong page', fakeAsync(() => {
    router.navigate(['']); 
    tick();
    expect(location.path()).toBe('/');
  }));
});
