import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view', component: ViewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
