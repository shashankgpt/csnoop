import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfileAdmin } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../state';
import { Router } from '@angular/router';
import * as AdminActions from '../state/admin.action';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromShared from '../../shared/state';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'All Users Profile';
  error = '';
  errorMessage$: Observable<string>;
  expandedElement: IProfileAdmin | null;
  columnsToDisplay: string[] = ['username', 'email', 'role', 'createdAt'];
  lock = false;
  dataSource: Observable<IProfileAdmin[]>;
  constructor(private store: Store<fromAuth.State>, private shareStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadAllUsers();
    this.store.pipe(select(fromAuth.getUsersData),
      takeWhile(() => this.componentActive)).subscribe((profile) => {
        console.log(profile);
        if (profile[0].email) {
          this.dataSource = of(profile);
          this.cd.detectChanges();
        }
      });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  lockUser(user: IProfileAdmin) {
    if (user.lock) {
      this.store.dispatch(new AdminActions.UnlockUser(user.username));
      return true;
    }
    this.store.dispatch(new AdminActions.LockUser(user.username));
  }
  activeUser(user: IProfileAdmin) {
    if (user.active) {
      this.store.dispatch(new AdminActions.DeactivateUser(user.username));
      return true;
    }
    this.store.dispatch(new AdminActions.ActivateUser(user.username));
  }
  loadAllUsers() {
    this.store.dispatch(new AdminActions.LoadAllUser());
  }
}
