import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { IProfile, IPasswordChange } from '../dataTypes';
import { ISnackbar } from '../../dataTypes/snackbar';
import * as fromUser from '../state';
import * as fromShared from '../../shared/state';
import { Router, RoutesRecognized } from '@angular/router';
import * as UserActions from '../state/user.action';
import { takeWhile } from 'rxjs/operators';
import { IProfileExtended } from '../dataTypes/profile';
import * as SharedActions from '../../shared/state/shared.action';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit, OnDestroy {
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
  componentActive = true;
  constructor(private userService: UserService, private store: Store<fromUser.State>, private snackBar: MatSnackBar,
              private shareStore: Store<fromShared.State>, private router: Router,private locationVal:Location,
              private cd: ChangeDetectorRef) { }

  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
    this.store.pipe(select(fromUser.getUserData),
      takeWhile(() => this.componentActive)).subscribe(
        profile => {
          const { firstName, lastName, email, gender, location, website } = profile;
          if (!email) { this.moveToView(); }
          this.f.firstName.setValue(firstName);
          this.f.lastName.setValue(lastName);
          this.f.email.setValue(email);
          this.f.gender.setValue(gender);
          this.f.location.setValue(location);
          this.f.website.setValue(website);
          this.cd.detectChanges();
        }
      );
    this.store.pipe(select(fromUser.getUserName)).subscribe(
      username => this.username = username
    );
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  get f() {
    return this.profileForm.controls;
  }
  get f2() {
    return this.passwordForm.controls;
  }
  onSubmit() {
    const profile: IProfile = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      gender: this.profileForm.value.gender,
      location: this.profileForm.value.location,
      website: this.profileForm.value.website
    };
    const p: IProfileExtended = { username: this.username, profile: { ...profile } };
    this.store.dispatch(new UserActions.UpdateUser(profile));

  }

  delete() {
    this.store.dispatch(new UserActions.DeleteUser());
  }
  updatePassword() {
    this.editPassword = !this.editPassword;
  }
  changePassword() {
    const password: IPasswordChange = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };
    this.store.dispatch(new UserActions.UpdateUserPassword(password));
  }
  moveToView() {
    this.router.navigate(['/user/view']);
  }
}
