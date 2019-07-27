import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { UserRoutingModule } from './user-routing.module';
import { reducer } from './state/user.reducer';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [ViewComponent, EditComponent, HomeComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature('users', reducer)
  ]
})
export class UserModule { }
