import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { RegisterBlogComponent } from './register-blog/register-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'view/:blogId', component: ViewBlogComponent },
  { path: 'register', component: RegisterBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
