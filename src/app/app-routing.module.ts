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
import { StudentViewFacultyPageComponent } from './student-folder/student-view-faculty-page/student-view-faculty-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { InboxHomeComponent } from './Inbox/inbox-FacultyHome/inbox-FacultyHome.component';
import { StudentHomeComponent } from './Inbox/inbox-StudentHome/inbox-StudentHome.component';
import { MatchResearchToStudentPageComponent } from './student-folder/match-research-to-student-page/match-research-to-student-page.component';
import { PlaceholderComponent } from './Inbox/placeholder/placeholder.component';
import { EmailShowComponent } from './Inbox/email-show/email-show.component';
import { EmailResolverService } from './Inbox/email-resolver.service';
import { AuthGuard } from './auth/auth.guard';



export const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'login', component: LandingPageComponent},
  { path: 'view-matches', component: MatchPageComponent, canActivate:[AuthGuard]},
  { path: 'opp-board', component: OpportunityBoardPageComponent, canActivate:[AuthGuard]},
  { path: 'view-faculty-profile', component: ViewFacultyPageComponent, canActivate:[AuthGuard]},
  { path: 'view-student-profile', component: ViewStudentPageComponent, canActivate:[AuthGuard]},
  { path: 'create-faculty-page', component: CreateFacultyPageComponent, canActivate:[AuthGuard]},
  { path: 'create-student-page', component: CreateStudentPageComponent, canActivate:[AuthGuard]},
  { path: 'faculty-home', component: FacultyHomePageComponent, canActivate:[AuthGuard]},
  { path: 'student-home', component: StudentHomePageComponent, canActivate:[AuthGuard]},
  { path: 'faculty-research', component: ManageResearchPageComponent, canActivate:[AuthGuard]},
  { path: 'edit-research', component: EditResearchPageComponent, canActivate:[AuthGuard]},
  { path: 'add-research', component: AddResearchPageComponent, canActivate:[AuthGuard]},
  { path: 'research-list', component: ResearchListPageComponent, canActivate:[AuthGuard]},
  { path: 'edit-faculty-profile', component: EditFacultyProfilePageComponent, canActivate:[AuthGuard]},
  { path: 'edit-student-profile', component: EditStudentProfilePageComponent, canActivate:[AuthGuard]},
  { path: 'student-list', component: StudentListComponent, canActivate:[AuthGuard]},
  { path: 'view-applicants', component: ViewApplicantsComponent, canActivate:[AuthGuard]},
  { path: 'faculty-view-student', component: FacultyViewStudentPageComponent, canActivate:[AuthGuard]},
  { path: 'student-view-faculty', component: StudentViewFacultyPageComponent, canActivate:[AuthGuard]},
  { path: 'faculty-list', component: FacultyListComponent, canActivate:[AuthGuard]},
  { path: 'auth-callback', component: AuthenticatorComponent},
  { path: 'inbox-FacultyHome', component: InboxHomeComponent, canActivate:[AuthGuard], 
    children: [
      {
        path: ':id',
        component: EmailShowComponent,
          resolve: {
            email: EmailResolverService
          }
      },
      { path: '', component: PlaceholderComponent }
  ]},
  { path: 'inbox-StudentHome', component: StudentHomeComponent,
    children: [
      {
        path: ':id',
        component: EmailShowComponent,
          resolve: {
            email: EmailResolverService
          }
      },
      { path: '', component: PlaceholderComponent }
  ]},
  { path: 'match-researches', component: MatchResearchToStudentPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
