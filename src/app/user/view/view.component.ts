import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IProfile } from '../dataTypes';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  value = 'test3';
profile: IProfile;
constructor(private userService: UserService, private store: Store<any> ) { }

ngOnInit() {
    this.userService.getLoggedInUser().subscribe(response => {
      const resData = response.data.user;
      this.profile = {
        firstName: resData.firstName === undefined ? '' : resData.firstName,
        lastName: resData.lastName === undefined ? '' : resData.lastName,
        email: resData.email === undefined ? '' : resData.email,
        gender: resData.gender === undefined ? '' : resData.gender,
        location: resData.location === undefined ? '' : resData.location,
        website: resData.website === undefined ? '' : resData.website
      };
      this.store.dispatch({
        type: 'USER_DATA',
        payload: this.profile
      });
      this.store.dispatch({
        type: 'USER_NAME',
        payload: resData.username
      });
    });
  }

}
