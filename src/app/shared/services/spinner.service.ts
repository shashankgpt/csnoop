import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared.action';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor( private shareStore: Store<fromShared.State>) { }
  activeSpinner() {
    return this.shareStore.dispatch(new SharedActions.ActivateSpinner());
  }
  deactiveSpinner() {
    return this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
  }
}
