import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { DailyTaskComponent } from './daily-task/daily-task.component';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: DailyTaskComponent, canActivate: [authGuard] },
  // { path: 'tasks', component: DailyTaskListComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
