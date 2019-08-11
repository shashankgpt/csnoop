import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { IProfile } from '../dataTypes';
import {roleObj} from '../dataTypes/user-info';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../state/user.reducer';
import { UserState } from '../state/user.state';
import { Router } from '@angular/router';
import * as UserActions  from '../state/user.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  errorMessage$: Observable<string>;
  // method 2
  profile$: Observable<IProfile>;
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  constructor(private userService: UserService, private store: Store<fromUser.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.store.dispatch({
    //   type: 'TOKEN_CODE',
    //   payload: '123'
    // });
    this.store.dispatch(new UserActions.LoadUser());
    // method 1
    this.store.pipe(select(fromUser.getUserData),
    takeWhile(() => this.componentActive)).subscribe((data) => {
      this.profile = data;
      this.cd.detectChanges();
    });
    // this.store.pipe(select(fromUser.getUserError),
    // takeWhile(() => this.componentActive)).subscribe((data) => {
    //   alert(data);
    //   this.cd.detectChanges();
    // });
    this.errorMessage$ = this.store.pipe(select(fromUser.getUserError));
    // method 2
    this.profile$ = this.store.pipe(select(fromUser.getUserData));
    // this.userService.getLoggedInUser().subscribe(response => {
    //   const resData2 = response.data.user;
    //   this.store.dispatch(new UserActions.SetCurrentUserProfile(resData2));
    //   this.store.dispatch(new UserActions.SetCurrentUsername(resData2.username));
    //   // this.store.dispatch({
    //   //   type: 'USER_DATA',
    //   //   payload: resData2
    //   // });
    //   // this.store.dispatch({
    //   //   type: 'USER_NAME',
    //   //   payload: resData2.username
    //   // });
    //   this.store.pipe(select('users')).subscribe((data: UserState) => {
    //     const resData = data.profile;
    //     this.profile = {
    //      firstName: resData.firstName === undefined ? '' : resData.firstName,
    //      lastName: resData.lastName === undefined ? '' : resData.lastName,
    //      email: resData.email === undefined ? '' : resData.email,
    //      gender: resData.gender === undefined ? '' : roleObj[resData.gender],
    //      location: resData.location === undefined ? '' : resData.location,
    //      website: resData.website === undefined ? '' : resData.website
    //    };
    //     this.cd.detectChanges();
    //   });
    // });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
}
