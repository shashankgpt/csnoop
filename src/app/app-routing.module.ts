import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {PostLoginGuard} from './authentication/post-login.guard';
import {PreLoginGuard} from './authentication/pre-login.guard';
import {PostLoginLoadGuard} from './authentication/post-login-load.guard';
import {PostLoginChildGuard} from './authentication/post-login-child.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
    canActivate: [PreLoginGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule),
    canActivate: [PostLoginGuard],
    canLoad: [PostLoginLoadGuard],
    canActivateChild: [PostLoginChildGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [PostLoginGuard],
    canLoad: [PostLoginLoadGuard],
    canActivateChild:[PostLoginChildGuard]
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(mod => mod.BlogModule),
    canActivate: [PostLoginGuard],
    canLoad: [PostLoginLoadGuard],
    canActivateChild:[PostLoginChildGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
