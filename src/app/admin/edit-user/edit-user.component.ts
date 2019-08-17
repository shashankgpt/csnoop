import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfileAdmin } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../state';
import { Router, ActivatedRoute } from '@angular/router';
import * as AdminActions from '../state/admin.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromShared from '../../shared/state';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'User Profile';
  profile: IProfileAdmin;
  error = '';
  errorMessage$: Observable<string>;
  username: string;
  constructor(private store: Store<fromAdmin.State>, private shareStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef,private route: ActivatedRoute) { }

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
        const valProfile = profiles.filter((profile)=>{
          return profile.username === this.username;
        });

        console.log(valProfile);
        this.cd.detectChanges();
      }
      });
  }
  moveToAllUsers() {
    this.router.navigate(['/admin/allUsers']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
