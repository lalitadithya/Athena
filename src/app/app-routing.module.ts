import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataScientistComponent } from './data-scientist/data-scientist.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'data-scientist', component: DataScientistComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
