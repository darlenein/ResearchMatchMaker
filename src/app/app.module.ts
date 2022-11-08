import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import  {MatToolbarModule } from '@angular/material/toolbar';
import { OpportunityBoardPageComponent } from './opportunity-board-page/opportunity-board-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { ViewFacultyPageComponent } from './view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './view-student-page/view-student-page.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ProfileViewComponent,
    HomePageComponent,
    TopMenuBarComponent,
    OpportunityBoardPageComponent,
    MatchPageComponent,
    ViewFacultyPageComponent,
    ViewStudentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
