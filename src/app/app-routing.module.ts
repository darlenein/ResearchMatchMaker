import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { OpportunityBoardPageComponent } from './opportunity-board-page/opportunity-board-page.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ViewFacultyPageComponent } from './view-faculty-page/view-faculty-page.component';
import { ViewStudentPageComponent } from './view-student-page/view-student-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'profile-view', component: ProfileViewComponent},
  { path: 'view-matches', component: MatchPageComponent},
  { path: 'opp-board', component: OpportunityBoardPageComponent},
  { path: 'view-faculy-profile', component: ViewFacultyPageComponent},
  { path: 'view-student-profile', component: ViewStudentPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
