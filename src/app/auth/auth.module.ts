import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/authenticate.reducer';
import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromShared from '../shared/state';
import * as fromAuth from './state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../shared/state/shared.action';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature('authentications', reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
  componentActive = true;
  constructor(private store: Store<fromAuth.State>,
              private shareStore: Store<fromShared.State>) {
      this.subscribeAuthMessage();
  }

  subscribeAuthMessage() {
    this.store.pipe(select(fromAuth.getAuthMessage),
      takeWhile(() => this.componentActive)).subscribe((snackResponse) => {
        if (snackResponse.snackBarActive) {
          this.shareStore.dispatch(new SharedActions.ActivateSnackBar(snackResponse));
        }
      });
  }
}

