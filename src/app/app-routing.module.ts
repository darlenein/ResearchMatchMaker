import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFacultyPageComponent } from './create-faculty-page/create-faculty-page.component';
import { CreateStudentPageComponent } from './create-student-page/create-student-page.component';
import { FacultyHomePageComponent } from './faculty-home-page/faculty-home-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageResearchPageComponent } from './manage-research-page/manage-research-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { OpportunityBoardPageComponent } from './opportunity-board-page/opportunity-board-page.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { ViewFacultyPageComponent } from './view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './view-student-page/view-student-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'profile-view', component: ProfileViewComponent},
  { path: 'view-matches', component: MatchPageComponent},
  { path: 'opp-board', component: OpportunityBoardPageComponent},
  { path: 'view-faculy-profile', component: ViewFacultyPageComponent},
  { path: 'view-student-profile', component: ViewStudentPageComponent},
  { path: 'create-faculty-page', component: CreateFacultyPageComponent},
  { path: 'create-student-page', component: CreateStudentPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'faculty-home', component: FacultyHomePageComponent},
  { path: 'student-home', component: StudentHomePageComponent},
  { path: 'faculty-research', component: ManageResearchPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
