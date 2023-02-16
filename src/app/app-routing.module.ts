import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard, AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { AddResearchPageComponent } from './faculty-folder/add-research-page/add-research-page.component';
import { CreateFacultyPageComponent } from './faculty-folder/create-faculty-page/create-faculty-page.component';
import { CreateStudentPageComponent } from './student-folder/create-student-page/create-student-page.component';
import { EditFacultyProfilePageComponent } from './faculty-folder/edit-faculty-profile-page/edit-faculty-profile-page.component';
import { EditResearchPageComponent } from './faculty-folder/edit-research-page/edit-research-page.component';
import { EditStudentProfilePageComponent } from './student-folder/edit-student-profile-page/edit-student-profile-page.component';
import { FacultyHomePageComponent } from './faculty-folder/faculty-home-page/faculty-home-page.component';
import { FacultyViewStudentPageComponent } from './faculty-folder/faculty-view-student-page/faculty-view-student-page.component';
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
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent},
  { path: 'auth-callback', component: AuthenticatorComponent},
  { path: 'view-matches', component: MatchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'opp-board', component: OpportunityBoardPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'view-faculty-profile', component: ViewFacultyPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'view-student-profile', component: ViewStudentPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'create-faculty-page', component: CreateFacultyPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'create-student-page', component: CreateStudentPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'faculty-home', component: FacultyHomePageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'student-home', component: StudentHomePageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'faculty-research', component: ManageResearchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'edit-research', component: EditResearchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'add-research', component: AddResearchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'research-list', component: ResearchListPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'edit-faculty-profile', component: EditFacultyProfilePageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'edit-student-profile', component: EditStudentProfilePageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'student-list', component: StudentListComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'view-applicants', component: ViewApplicantsComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'faculty-view-student', component: FacultyViewStudentPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'student-view-faculty', component: StudentViewFacultyPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'faculty-list', component: FacultyListComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'sso-page', component: SSOPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'view-research-page', component: ViewResearchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'student-view-research-page', component: ViewStudentResearchPageComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'view-research-homepage', component: ViewResearchHomepageFacultyComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  { path: 'student-view-research-homepage', component: ViewResearchHomepageStudentComponent, canActivate: [AutoLoginPartialRoutesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
