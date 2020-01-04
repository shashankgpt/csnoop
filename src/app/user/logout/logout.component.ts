import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfile, genderObj } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../state';
import { Router } from '@angular/router';
import * as UserActions from '../state/user.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<fromUser.State>, private sharedStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.sharedStore.dispatch(new SharedActions.IsLoggedOut());
    this.store.dispatch(new UserActions.LogoutUser());
  }

}

