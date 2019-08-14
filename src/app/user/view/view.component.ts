import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfile, ISnackbar } from '../dataTypes';
import { roleObj } from '../dataTypes/user-info';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../state';
import { Router } from '@angular/router';
import * as UserActions from '../state/user.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared.action';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'User Profile';
  profile: IProfile;
  error = '';
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromUser.State>, private shareStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.LoadUser());
    this.store.pipe(select(fromUser.getUserData),
      takeWhile(() => this.componentActive)).subscribe((profile) => {
        this.profile = {
          firstName : profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          gender: profile.gender ? roleObj[profile.gender] : '',
          location: profile.location,
          website: profile.website,
        };
        this.cd.detectChanges();
      });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
