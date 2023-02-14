import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddResearchPageComponent } from './faculty-folder/add-research-page/add-research-page.component';
import { CreateFacultyPageComponent } from './faculty-folder/create-faculty-page/create-faculty-page.component';
import { CreateStudentPageComponent } from './student-folder/create-student-page/create-student-page.component';
import { EditFacultyProfilePageComponent } from './faculty-folder/edit-faculty-profile-page/edit-faculty-profile-page.component';
import { EditResearchPageComponent } from './faculty-folder/edit-research-page/edit-research-page.component';
import { EditStudentProfilePageComponent } from './student-folder/edit-student-profile-page/edit-student-profile-page.component';
import { FacultyHomePageComponent } from './faculty-folder/faculty-home-page/faculty-home-page.component';
import { FacultyViewStudentPageComponent } from './faculty-folder/faculty-view-student-page/faculty-view-student-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageResearchPageComponent } from './faculty-folder/manage-research-page/manage-research-page.component';
import { MatchPageComponent } from './student-folder/match-page/match-page.component';
import { OpportunityBoardPageComponent } from './student-folder/opportunity-board-page/opportunity-board-page.component';
import { ResearchListPageComponent } from './faculty-folder/research-list-page/research-list-page.component';
import { StudentHomePageComponent } from './student-folder/student-home-page/student-home-page.component';
import { ViewFacultyPageComponent } from './faculty-folder/view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './student-folder/view-student-page/view-student-page.component';
import { ViewApplicantsComponent } from './faculty-folder/view-applicants/view-applicants.component';
import { StudentListComponent } from './faculty-folder/student-list/student-list.component';
import { FacultyListComponent } from './student-folder/faculty-list/faculty-list.component';
import { SSOPageComponent } from './sso-page/sso-page.component';
import { StudentViewFacultyPageComponent } from './student-folder/student-view-faculty-page/student-view-faculty-page.component';
import { ViewResearchPageComponent } from './faculty-folder/view-research-page/view-research-page.component';
import { ViewStudentResearchPageComponent } from './student-folder/student-view-research-page/student-view-research-page.component';
import { ViewResearchHomepageFacultyComponent } from './faculty-folder/view-research-homepage/view-research-homepage.component';
import { ViewResearchHomepageStudentComponent } from './student-folder/student-view-research-homepage/student-view-research-homepage.component';


import { AuthGuardService } from './services/auth-guard.service'; 
//add , canActivate: [AuthGuardService] to path to protect component with oidc authorization
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { MatchResearchToStudentPageComponent } from './student-folder/match-research-to-student-page/match-research-to-student-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'view-matches', component: MatchPageComponent},
  { path: 'opp-board', component: OpportunityBoardPageComponent},
  { path: 'view-faculty-profile', component: ViewFacultyPageComponent},
  { path: 'view-student-profile', component: ViewStudentPageComponent},
  { path: 'create-faculty-page', component: CreateFacultyPageComponent},
  { path: 'create-student-page', component: CreateStudentPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'faculty-home', component: FacultyHomePageComponent},
  { path: 'student-home', component: StudentHomePageComponent},
  { path: 'faculty-research', component: ManageResearchPageComponent},
  { path: 'edit-research', component: EditResearchPageComponent},
  { path: 'add-research', component: AddResearchPageComponent},
  { path: 'research-list', component: ResearchListPageComponent},
  { path: 'edit-faculty-profile', component: EditFacultyProfilePageComponent},
  { path: 'edit-student-profile', component: EditStudentProfilePageComponent},
  { path: 'student-list', component: StudentListComponent},
  { path: 'view-applicants', component: ViewApplicantsComponent},
  { path: 'faculty-view-student', component: FacultyViewStudentPageComponent},
  { path: 'student-view-faculty', component: StudentViewFacultyPageComponent},
  { path: 'faculty-list', component: FacultyListComponent},
  { path: 'sso-page', component: SSOPageComponent},
  { path: 'auth-callback', component: AuthCallbackComponent},
  { path: 'view-research-page', component: ViewResearchPageComponent},
  { path: 'student-view-research-page', component: ViewStudentResearchPageComponent},
  { path: 'view-research-homepage', component: ViewResearchHomepageFacultyComponent},
  { path: 'student-view-research-homepage', component: ViewResearchHomepageStudentComponent},
  { path: 'match-researches', component: MatchResearchToStudentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
