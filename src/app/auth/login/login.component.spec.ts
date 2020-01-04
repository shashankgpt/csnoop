import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../state/authenticate.reducer';
import { AuthEffects } from '../state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as fromAuth from '../state';
import * as fromShared from '../../shared/state';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let store: Store<fromAuth.State>;
  let shareStore: Store<fromShared.State>;

  beforeEach(() => {
    component = new LoginComponent(store, shareStore);
  });

  it('ngOnDestroy', () => {
    component.componentActive = true;
    component.ngOnDestroy();
    expect(component.componentActive).toBeFalsy();
  });
});
