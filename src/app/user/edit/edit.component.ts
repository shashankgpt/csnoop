import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { IProfile, IPasswordChange, ISnackbar } from '../dataTypes';
import * as fromUser from '../state/user.reducer';
import * as fromShared from '../../shared/state/shared.reducer';
import { Router } from '@angular/router';
import * as UserActions  from '../state/user.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {
  head = 'Edit Profile';
  head2 = 'Update Password';
  username: string;
  editPassword = false;
  hide = true;
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
  });
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService, private store: Store<fromUser.State>, private snackBar: MatSnackBar,
              private shareStore: Store<fromShared.State>, private router: Router) { }

    openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
    this.store.pipe(select(fromUser.getUserData)).subscribe(
      profile => {
        const { firstName, lastName, email, gender, location, website } = profile;
        this.f.firstName.setValue(firstName);
        this.f.lastName.setValue(lastName);
        this.f.email.setValue(email);
        this.f.gender.setValue(gender);
        this.f.location.setValue(location);
        this.f.website.setValue(website);
      }
    );
    this.store.pipe(select(fromUser.getUserName)).subscribe(
      username => this.username = username
    );
  }
  get f() {
    return this.profileForm.controls;
  }
  get f2() {
    return this.passwordForm.controls;
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    // return;
    const profile: IProfile = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      gender: this.profileForm.value.gender,
      location: this.profileForm.value.location,
      website: this.profileForm.value.website
    };
    this.userService.updateLoggedInUser(this.username, profile).subscribe(response => {
      console.log(response);
      this.store.dispatch(new UserActions.SetCurrentUserProfile(response.data.user));
      // this.store.dispatch({
      //   type: 'USER_DATA',
      //   payload: response.data.user
      // });
      const snack1: ISnackbar = {
        snackBarActive: true,
        snackBarMessage: response.Message,
        snackBarAction: 'Login'
      };
      this.shareStore.dispatch({
        type: 'SET_NOTIFY',
        payload: snack1
      });
      this.shareStore.dispatch({
        type: 'SPINNER_ACTIVATE',
        payload: false
      });
      this.router.navigate(['/user/view']);
    });
  }

  delete() {
    this.userService.deleteUser(this.username).subscribe(response => {
      console.log(response);
      this.store.dispatch({
        type: 'USER_DATA',
        payload: response.data.user
      });
      this.openSnackBar(response.Message, 'Register');
    });
  }
  updatePassword() {
    this.editPassword = !this.editPassword;
  }
  changePassword() {
    this.shareStore.dispatch({
      type: 'SPINNER_ACTIVATE',
      payload: true
    });
    const password: IPasswordChange = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };
    this.userService.updatePassword(password).subscribe(Response => {
      this.shareStore.dispatch({
        type: 'SPINNER_ACTIVATE',
        payload: false
      });
      const snack1: ISnackbar = {
        snackBarActive: true,
        snackBarMessage: Response.Message,
        snackBarAction: 'Passport Reset'
      };
      this.shareStore.dispatch({
        type: 'SET_NOTIFY',
        payload: snack1
      });
      this.router.navigate(['/user/view']);
    });
  }
}
