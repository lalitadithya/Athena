import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyHomePageComponent } from './my-home-page/my-home-page.component';
import { DataScientistComponent } from './data-scientist.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';

const dataScientistRoutes: Routes = [
  { path: 'data-scientist', component: DataScientistComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dataScientistRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class DataScientistRoutingModule { }
