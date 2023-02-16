import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuBarComponent } from './student-folder/student-top-menu-bar/student-top-menu-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OpportunityBoardPageComponent } from './student-folder/opportunity-board-page/opportunity-board-page.component';
import { MatchPageComponent } from './student-folder/match-page/match-page.component';
import { ViewFacultyPageComponent } from './faculty-folder/view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './student-folder/view-student-page/view-student-page.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateStudentPageComponent } from './student-folder/create-student-page/create-student-page.component';
import { CreateFacultyPageComponent } from './faculty-folder/create-faculty-page/create-faculty-page.component';
import { BannerNoButtonsComponent } from './banner-no-buttons/banner-no-buttons.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatchResearchToStudentPageComponent } from './student-folder/match-research-to-student-page/match-research-to-student-page.component';
import { EditFacultyProfilePageComponent } from './faculty-folder/edit-faculty-profile-page/edit-faculty-profile-page.component';
import { EditStudentProfilePageComponent } from './student-folder/edit-student-profile-page/edit-student-profile-page.component';
import { AddResearchPageComponent } from './faculty-folder/add-research-page/add-research-page.component';
import { ManageResearchPageComponent } from './faculty-folder/manage-research-page/manage-research-page.component';
import { ViewResearchPageComponent } from './faculty-folder/view-research-page/view-research-page.component';
import { EditResearchPageComponent } from './faculty-folder/edit-research-page/edit-research-page.component';
import { StudentHomePageComponent } from './student-folder/student-home-page/student-home-page.component';
import { FacultyHomePageComponent } from './faculty-folder/faculty-home-page/faculty-home-page.component';
import { FacultyTopMenuBarComponent } from './faculty-folder/faculty-top-menu-bar/faculty-top-menu-bar.component';
import { ResearchListPageComponent } from './faculty-folder/research-list-page/research-list-page.component';
import { FacultyViewStudentPageComponent } from './faculty-folder/faculty-view-student-page/faculty-view-student-page.component';
import { StudentViewFacultyPageComponent } from './student-folder/student-view-faculty-page/student-view-faculty-page.component';
import { ViewApplicantsComponent } from './faculty-folder/view-applicants/view-applicants.component';
import { StudentListComponent } from './faculty-folder/student-list/student-list.component';
import { FacultyListComponent } from './student-folder/faculty-list/faculty-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { SSOPageComponent } from './sso-page/sso-page.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CancelResearchDialogComponent } from './student-folder/cancel-research-dialog/cancel-research-dialog.component';
import { ViewStudentResearchPageComponent } from './student-folder/student-view-research-page/student-view-research-page.component';
import { ViewResearchHomepageFacultyComponent } from './faculty-folder/view-research-homepage/view-research-homepage.component';
import { ViewResearchHomepageStudentComponent } from './student-folder/student-view-research-homepage/student-view-research-homepage.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

//Messaging
import { InboxHomeComponent } from './Inbox/inbox-FacultyHome/inbox-FacultyHome.component';
import { EmailCreateComponent } from './Inbox/email-create/email-create.component';
import { EmailReplyComponent } from './Inbox/email-reply/email-reply.component';
import { EmailIndexComponent } from './Inbox/email-index/email-index.component';
import { EmailShowComponent } from './Inbox/email-show/email-show.component';
import { StudentHomeComponent } from './Inbox/inbox-StudentHome/student-home.component';
import { PlaceholderComponent } from './Inbox/placeholder/placeholder.component';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuBarComponent,
    OpportunityBoardPageComponent,
    MatchPageComponent,
    ViewFacultyPageComponent,
    ViewStudentPageComponent,
    LoginPageComponent,
    CreateStudentPageComponent,
    CreateFacultyPageComponent,
    BannerNoButtonsComponent,
    MatchResearchToStudentPageComponent,
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
    StudentViewFacultyPageComponent,
    ViewApplicantsComponent,
    StudentListComponent,
    FacultyListComponent,
    SSOPageComponent,
    CancelResearchDialogComponent,
    ViewStudentResearchPageComponent,
    ViewResearchHomepageFacultyComponent,
    ViewResearchHomepageStudentComponent,
    InboxHomeComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    EmailShowComponent,
    StudentHomeComponent,
    PlaceholderComponent
    
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
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    MatMenuModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: 
  [ 
    //Kole stuff
    AuthGuardService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
