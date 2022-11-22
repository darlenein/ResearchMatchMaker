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

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'view-matches', component: MatchPageComponent},
  { path: 'opp-board', component: OpportunityBoardPageComponent},
  { path: 'view-faculy-profile', component: ViewFacultyPageComponent},
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
  { path: 'faculty-list', component: FacultyListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
