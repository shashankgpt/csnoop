import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfileAdmin } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../state';
import { Router, ActivatedRoute } from '@angular/router';
import * as AdminActions from '../state/admin.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromShared from '../../shared/state';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IProfileExtended, IProfile } from 'src/app/user/dataTypes/profile';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'User Profile';
  profile: IProfileAdmin;
  filteredProfile: IProfileAdmin;
  updateProfile: IProfileExtended;
  error = '';
  errorMessage$: Observable<string>;
  username: string;
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store<fromAdmin.State>, private shareStore: Store<fromShared.State>, private router: Router,
              private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.pipe(select(fromAdmin.getActiveUserName),
      takeWhile(() => this.componentActive)).subscribe((username) => {
        if (!username) { this.moveToAllUsers(); }
      });
    if (this.route.snapshot.paramMap.has('username')) {
      this.username = this.route.snapshot.paramMap.get('username');
    }
    // this.store.dispatch(new AdminActions.setActiveUsername());
    this.store.pipe(select(fromAdmin.getUsersData),
      takeWhile(() => this.componentActive)).subscribe((profiles) => {
        if (profiles[0].email) {
          const valProfile = profiles.filter((profile) => {
            return profile.username === this.username;
          });
          if (valProfile[0]) {
            this.filteredProfile = valProfile[0];
            const {firstName, lastName, gender, location, website} = this.filteredProfile.profile;
            const {username, role, email} = this.filteredProfile;
            this.username = username;
            this.f.firstName.setValue(firstName);
            this.f.lastName.setValue(lastName);
            this.f.email.setValue(email);
            this.f.role.setValue(role);
            this.f.gender.setValue(gender);
            this.f.location.setValue(location);
            this.f.website.setValue(website);
            this.cd.detectChanges();
          }
        }
      });
  }
  get f() {
    return this.profileForm.controls;
  }
  moveToAllUsers() {
    this.router.navigate(['/admin/allUsers']);
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
    this.store.dispatch(new AdminActions.UpdateUser(p));

  }
  delete() {
    this.store.dispatch(new AdminActions.DeleteUser(this.username));
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}


