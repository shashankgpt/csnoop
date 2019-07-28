import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IProfile } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../state/user.reducer'
import { UserState } from '../state/user.state';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  value = 'test3';
  profile: IProfile;
  constructor(private userService: UserService, private store: Store<fromUser.State>) { }

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
        // alert("token view" + data.tokenCodeValue);
         const resData = data.profile;
         this.profile = {
          firstName: resData.firstName === undefined ? '' : resData.firstName,
          lastName: resData.lastName === undefined ? '' : resData.lastName,
          email: resData.email === undefined ? '' : resData.email,
          gender: resData.gender === undefined ? '' : resData.gender,
          location: resData.location === undefined ? '' : resData.location,
          website: resData.website === undefined ? '' : resData.website
        };
         // alert(this.profile.firstName);
        console.log(data);
      });
    });
  }

}

