import { Routes } from '@angular/router';
import { LeaveListComponent } from './components/leave-list/leave-list.component';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaves', pathMatch: 'full' },
  { path: 'leaves', component: LeaveListComponent },
  { path: 'apply', component: LeaveFormComponent },
  { path: 'edit/:id', component: LeaveFormComponent }
];
