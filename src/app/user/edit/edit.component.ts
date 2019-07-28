import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { IProfile, IPasswordChange } from '../dataTypes';
import * as fromUser from '../state/user.reducer'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  value = 'test';
  username: string;
  editPassword= false;
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService, private store: Store<fromUser.State>, private snackBar: MatSnackBar) { }
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
    this.store.pipe(select('users')).subscribe(
      users => {
        console.log(users);
        this.username = users.username;
        const { firstName, lastName, email, gender, location, website } = users.user;
        this.f.firstName.setValue(firstName);
        this.f.lastName.setValue(lastName);
        this.f.email.setValue(email);
        this.f.gender.setValue(gender);
        this.f.location.setValue(location);
        this.f.website.setValue(website);
      }
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
      this.store.dispatch({
        type: 'USER_DATA',
        payload: response.data.user
      });
      this.openSnackBar(response.Message, 'Register');
    });
  }

  delete(){
    this.userService.deleteUser(this.username).subscribe(response => {
      console.log(response);
      this.store.dispatch({
        type: 'USER_DATA',
        payload: response.data.user
      });
      this.openSnackBar(response.Message, 'Register');
    });
  }
  updatePassword()
  {
    this.editPassword = !this.editPassword
  }
  changePassword(){
    const password: IPasswordChange = {
     oldPassword: this.passwordForm.value.oldPassword,
     newPassword: this.passwordForm.value.newPassword
    }
    this.userService.updatePassword(password).subscribe(Response => {
      console.log(Response);
    });
  }
}
