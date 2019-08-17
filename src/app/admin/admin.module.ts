import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule, Store, select } from '@ngrx/store';
import { AdminRoutingModule } from './admin-routing.module';
// import { reducer } from './state/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
// import {UserEffects } from './state/admin.effects';
import * as fromShared from '../shared/state';
// import * as fromAdmin from './state';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../shared/state/shared.action';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    SharedModule,
    // StoreModule.forFeature('users', reducer),
    // EffectsModule.forFeature([UserEffects])
  ]
})
export class AdminModule {}
