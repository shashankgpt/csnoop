import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'allUsers', component: UsersComponent },
  { path: 'editUser/:username', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

