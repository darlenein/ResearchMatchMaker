import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OpportunityBoardPageComponent } from './opportunity-board-page/opportunity-board-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { ViewFacultyPageComponent } from './view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './view-student-page/view-student-page.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateStudentPageComponent } from './create-student-page/create-student-page.component';
import { CreateFacultyPageComponent } from './create-faculty-page/create-faculty-page.component';
import { BannerNoButtonsComponent } from './banner-no-buttons/banner-no-buttons.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfileViewComponent,
    HomePageComponent,
    TopMenuBarComponent,
    OpportunityBoardPageComponent,
    MatchPageComponent,
    ViewFacultyPageComponent,
    ViewStudentPageComponent,
    LoginPageComponent,
    CreateStudentPageComponent,
    CreateFacultyPageComponent,
    BannerNoButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
