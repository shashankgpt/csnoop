import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IProfileAdmin } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../state';
import { Router } from '@angular/router';
import * as AdminActions from '../state/admin.action';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromShared from '../../shared/state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  componentActive = true;
  head = 'All Users Profile';
  error = '';
  errorMessage$: Observable<string>;
  expandedElement: IProfileAdmin | null;
  displayedColumns: string[] = ['username', 'email', 'role', 'firstName', 'lastName', 'location', 'website'];
  dataSource: Observable<IProfileAdmin[]>;
  constructor(private store: Store<fromAuth.State>, private shareStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(new AdminActions.LoadAllUser());
    this.store.pipe(select(fromAuth.getUsersData),
      takeWhile(() => this.componentActive)).subscribe((profile) => {
        console.log(profile);
        if(profile[0].email) {
        this.dataSource = of(profile);
        }
      });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
