import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopMenuBarComponent } from './student-top-menu-bar/student-top-menu-bar.component';
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
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchInfoPageComponent } from './match-progress-page/match-progress-page.component';
import { EditFacultyProfilePageComponent } from './edit-faculty-profile-page/edit-faculty-profile-page.component';
import { EditStudentProfilePageComponent } from './edit-student-profile-page/edit-student-profile-page.component';
import { AddResearchPageComponent } from './add-research-page/add-research-page.component';
import { ManageResearchPageComponent } from './manage-research-page/manage-research-page.component';
import { ViewResearchPageComponent } from './view-research-page/view-research-page.component';
import { EditResearchPageComponent } from './edit-research-page/edit-research-page.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { FacultyHomePageComponent } from './faculty-home-page/faculty-home-page.component';
import { FacultyTopMenuBarComponent } from './faculty-top-menu-bar/faculty-top-menu-bar.component';
import { ResearchListPageComponent } from './research-list-page/research-list-page.component';
import { FacultyViewStudentPageComponent } from './faculty-view-student-page/faculty-view-student-page.component';
import { StudentViewFacultyPageComponent } from './student-view-faculty-page/student-view-faculty-page.component';

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
    BannerNoButtonsComponent,
    MatchInfoPageComponent,
    EditFacultyProfilePageComponent,
    EditStudentProfilePageComponent,
    AddResearchPageComponent,
    ManageResearchPageComponent,
    ViewResearchPageComponent,
    EditResearchPageComponent,
    StudentHomePageComponent,
    FacultyHomePageComponent,
    FacultyTopMenuBarComponent,
    ResearchListPageComponent,
    FacultyViewStudentPageComponent,
    StudentViewFacultyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
