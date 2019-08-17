import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule, Store, select } from '@ngrx/store';
import { AdminRoutingModule } from './admin-routing.module';
import { reducer } from './state/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import {AdminEffects } from './state/admin.effects';
import * as fromShared from '../shared/state';
import * as fromAdmin from './state';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../shared/state/shared.action';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature('admins', reducer),
    EffectsModule.forFeature([AdminEffects])
  ]
})
export class AdminModule {
  componentActive = true;
  constructor(private store: Store<fromAdmin.State>, private shareStore: Store<fromShared.State>) {
  this.subscribeNotification();
  }

  subscribeNotification() {
    this.store.pipe(select(fromAdmin.getAdminMessage),
    takeWhile(() => this.componentActive)).subscribe((snackResponse) => {
      if (snackResponse.snackBarActive) {
        this.shareStore.dispatch(new SharedActions.ActivateSnackBar(snackResponse));
      }
    });
  }
}
