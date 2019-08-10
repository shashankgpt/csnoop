import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { IProfile } from '../dataTypes';
import {roleObj} from '../dataTypes/user-info';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../state/user.reducer';
import { UserState } from '../state/user.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {
  head = 'User Profile';
  profile: IProfile;
  constructor(private userService: UserService, private store: Store<fromUser.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.store.dispatch({
    //   type: 'TOKEN_CODE',
    //   payload: '123'
    // });
    this.userService.getLoggedInUser().subscribe(response => {
      const resData2 = response.data.user;
      this.store.dispatch({
        type: 'USER_DATA',
        payload: resData2
      });
      this.store.dispatch({
        type: 'USER_NAME',
        payload: resData2.username
      });
      this.store.pipe(select('users')).subscribe((data: UserState) => {
        const resData = data.profile;
        this.profile = {
         firstName: resData.firstName === undefined ? '' : resData.firstName,
         lastName: resData.lastName === undefined ? '' : resData.lastName,
         email: resData.email === undefined ? '' : resData.email,
         gender: resData.gender === undefined ? '' : roleObj[resData.gender],
         location: resData.location === undefined ? '' : resData.location,
         website: resData.website === undefined ? '' : resData.website
       };
        this.cd.detectChanges();
      });
    });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
}
