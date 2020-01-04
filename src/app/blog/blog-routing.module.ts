import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { RegisterBlogComponent } from './register-blog/register-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { DetailComponent } from './detail/detail.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'edit/:blogId', component: ViewBlogComponent },
  { path: 'view/:blogId', component: DetailComponent },
  { path: 'all', component: AllComponent },
  { path: 'register', component: RegisterBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
