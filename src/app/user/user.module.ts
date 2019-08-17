import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule, Store, select } from '@ngrx/store';

import { UserRoutingModule } from './user-routing.module';
import { reducer } from './state/user.reducer';
import { HomeComponent } from './home.component';
import { EffectsModule } from '@ngrx/effects';
import {UserEffects } from './state/user.effects';
import * as fromShared from '../shared/state';
import * as fromUser from './state';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../shared/state/shared.action';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [ViewComponent, EditComponent, HomeComponent, LogoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule {
  componentActive = true;
  constructor(private store: Store<fromUser.State>, private shareStore: Store<fromShared.State>) {
  this.subscribeNotification();
  }

  subscribeNotification() {
    this.store.pipe(select(fromUser.getUserMessage),
    takeWhile(() => this.componentActive)).subscribe((snackResponse) => {
      if (snackResponse.snackBarActive) {
        this.shareStore.dispatch(new SharedActions.ActivateSnackBar(snackResponse));
      }
    });
  }
 }
