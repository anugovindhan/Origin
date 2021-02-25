import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {Role} from './models/role';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_USER',
        'ROLE_ADMIN']}
  },
  {path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_USER']}
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
